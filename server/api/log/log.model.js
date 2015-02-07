'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var LogSchema = new Schema({
  info: String,
  timestamp: Number,
  temperature: Number,
  device : { type : Schema.ObjectId, ref : 'Device' }
});

module.exports = mongoose.model('Log', LogSchema);
