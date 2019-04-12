const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AccountSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  accessToken: {
    type: String,
    require: true
  },
  itemId: {
    type: String,
    require: true
  },
  institutionName: {
    type: String,
    require: true
  },
  accountName: {
    type: String,

  },
  accountType: {
    type: String,

  },
  accountSubType: {
    type: String,    
  }
});

module.exports = Account = mongoose.model("account", AccountSchema);