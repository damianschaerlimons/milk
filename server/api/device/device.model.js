'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    Logs =  mongoose.model('Log');

var DeviceSchema = new Schema({
  name: String,
  user : { type : Schema.ObjectId, ref : 'User' }
});

module.exports = mongoose.model('Device', DeviceSchema);
