//pull all required packages&&load our models&&init plaid using api keys
const express = require('express');
const plaid = require('plaid');
const router = express.Router();
const passport = require('passport');
const moment = require('moment');
const mongoose = require('mongoose');

//Load account and usr models
const Account = require('../../models/Account');
const User = require('../../models/User');

const PLAID_CLIENT_ID = '5cafd9ecf9c7ee0012d5ab00';
const PLAID_SECRET = 'f4785648c2e65f2634af3bd8a4475b';
const PLAID_PUBLIC_KEY = '0e6537859842b48227512f9d472960';

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

module.exports = router;