//pull all required packages&&load our models&&init plaid using api keys
const express = require("express");
const plaid = require("plaid");
const router = express.Router();
const passport = require("passport");
const moment = require("moment");
const mongoose = require("mongoose");

//Load account and usr models
const Account = require("../../models/Account");
const User = require("../../models/User");

const PLAID_CLIENT_ID = "5cafd9ecf9c7ee0012d5ab00";
const PLAID_SECRET = "f4785648c2e65f2634af3bd8a4475b";
const PLAID_PUBLIC_KEY = "0e6537859842b48227512f9d472960";

const client = new plaid.Client(
  PLAID_CLIENT_ID,
  PLAID_SECRET,
  PLAID_PUBLIC_KEY,
  plaid.environments.sandbox,
  { version: "2018-05-22" }
);

var PUBLIC_TOKEN = null;
var ACCESS_TOKEN = null;
var ITEM_ID = null;

//routes will go here

//this route will post to api/plaid/accounts/add
//will trade public token for access tokens and stores credentials in the database
//access to this route will be private

router.post(
  "/accounts/add",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    PUBLIC_TOKEN = req.body.public_token;

    const userId = req.user.id;

    const institution = req.body.metadata.institution;
    const { name, institution_id } = institution;

    if (PUBLIC_TOKEN) {
      client
        .exchangePublicToken(PUBLIC_TOKEN)
        .then(exchangeResponse => {
          ACCESS_TOKEN = exchangeResponse.access_token;
          ITEM_ID = exchangeResponse.item_id;

          //check if account already exists for specific user
          Account.findOne({
            userId: req.user.id,
            institutioniD: institution_id
          })
            .then(account => {
              if (account) {
                console.log("Account already exists");
              } else {
                const newAccount = new Account({
                  //if account doesnt exist then create
                  userId: userId,
                  accessToken: ACCESS_TOKEN,
                  itemid: ITEM_ID,
                  institutionId: institution_id,
                  institutionName: name
                });
                newAccount.save().then(account => res.json(account));
              }
            })
            .catch(err => console.log(err)); //mongo error
        })
        .catch(err => console.log(err)); //plaid error
    }
  }
);

router.delete(
  "/accounts/:id", //unlink account with given id
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Account.findById(req.params.id).then(account => {
      //search for account using id
      account.remove().then(() => res.json({ success: true })); //Delete account
    });
  }
);

router.get(
  "/accounts",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Account.find({ userId: req.user.id })
      .then(accounts => res.json(accounts))
      .catch(err => console.log(err));
  }
);

router.post(
  "/accounts/transactions",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const now = moment();
    const today = now.format("YYYY-MM-DD");
    const thirtyDaysAgo = now.subtract(30, "days").format("YYYY-MM-DD"); //set to 30 days change if want more

    let transactions = [];

    const accounts = req.body;

    if (accounts) {
      accounts.forEach(account => {
        ACCESS_TOKEN = account.accessToken;
        const institutionName = account.institutionName;
        client
          .getTransactions(ACCESS_TOKEN, thirtyDaysAgo, today)
          .then(resp => {
            transactions.push({
              accountName: institutionName,
              transactions: resp.transactions
            });
            //Dont respond until all transactions have been added
            if (transactions.length === accounts.length) {
              res.json(transactions);
            }
          })
          .catch(err => console.log(err));
      });
    }
  }
);

module.exports = router;
