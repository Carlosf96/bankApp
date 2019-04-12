//find and use technologies we will use.
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const users = require('./routes/api/users');
const plaid = require('./routes/api/plaid');
const app = express();
const path = require('path');
//bodyparse middleware
app.use(bodyParser.urlencoded({
    extended: false
})); //parse the url

app.use(bodyParser.json());//parse to jason

const db = require("./config/keys").mongoURI;//require config for DB

mongoose//our connection to mongoDB
    .connect(
        db, {
            useNewUrlParser: true
        })
    .then(() => console.log("MongoDB connected successfully!"))
    .catch(err => console.log(err))
//passport middleware
app.use(passport.initialize());
//passport configs
require('./config/passport')(passport);
//routes
app.use('/api/users', users);
app.use('/api/plaid', plaid);
//server static assets if in production 
if (process.env.NODE_ENV === 'production') {
   //set a static folder
  //app.use(express.static('client/build')); 
  app.use(express.static(path.join(__dirname, 'client/build')));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const port = process.env.PORT || 5000; 


app.listen(port, "0.0.0.0", () => {//let server listen on defined port
    console.log(`App listening on ${port}!`);
});