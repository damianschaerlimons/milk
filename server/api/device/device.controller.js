'use strict';

var _ = require('lodash');
var Device = require('./device.model');
var Log = require('../log/log.model');

// Get list of devices
exports.index = function(req, res) {

  // Device.find({'user._id': req.user._id}).populate('user').exec(function(err, devices){
  //   if(err) { return handleError(res, err); }
  //   return res.json(200, devices);
  // });

  Device.find({'user': req.user._id}, function (err, devices) {
    if(err) { return handleError(res, err); }
    return res.json(200, devices);
  });
};

exports.count = function(req,res){
  Log.count({device: req.params.id}, function(err, count){
      if(err) { return handleError(res, err); }
      var result=  {
        count: count,
        device: req.params.id
      }
      return res.json(result);
  });
}

exports.logs = function(req,res){
  console.log(req.query.start);
  console.log(req.query.end);

  Log.find({device: req.params.id, timestamp: {$gte :req.query.start, $lt: req.query.end}},{},{'sort': 'timestamp'}, function(err, logs){
    if(err) { return handleError(res, err); }
      return res.json(logs);
  })

}


// Get a single device
exports.show = function(req, res) {
  Device.findById(req.params.id, function (err, device) {
    if(err) { return handleError(res, err); }
    if(!device) { return res.send(404); }
    return res.json(device);
  });
};

// Creates a new device in the DB.
exports.create = function(req, res) {
  var body = req.body;
  body.user = req.user._id;
  Device.create(req.body, function(err, device) {
    if(err) { return handleError(res, err); }
    return res.json(201, device);
  });
};

// Updates an existing device in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Device.findById(req.params.id, function (err, device) {
    if (err) { return handleError(res, err); }
    if(!device) { return res.send(404); }
    var updated = _.merge(device, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, device);
    });
  });
};

// Deletes a device from the DB.
exports.destroy = function(req, res) {
  Device.findById(req.params.id, function (err, device) {
    if(err) { return handleError(res, err); }
    if(!device) { return res.send(404); }
    device.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
