'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ThingSchema = new Schema({
  info: String,
  timestamp: Date,
  temperature: Number,
  device : { type : Schema.ObjectId, ref : 'Device' }
});

module.exports = mongoose.model('Thing', ThingSchema);
