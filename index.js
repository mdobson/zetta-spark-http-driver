var Spark = require('spark');
var Scout = require('zetta-scout');
var util = require('util');
var SparkDriver = require('./spark_driver');

var SparkScout = module.exports = function(username, password){
  Scout.call(this);
  this._username = username;
  this._password = password;
};
util.inherits(SparkScout, Scout);

SparkScout.prototype.init = function(next) {
  var self = this;
  Spark.login({ username: process.env.SPARK_USER, password: process.env.SPARK_PASS }, function(err, body) {
    Spark.listDevices(function(err, devices) {
      devices.forEach(function(device) {
        var coreQuery = self.server.where({ coreId: device.id });
        self.server.find(coreQuery, function(err, results) {
          if(!err) {
            if(results.length) {
              var result = results[0];
              self.provision(result, SparkDriver, device);
            } else {
              self.discover(SparkDriver, device);
            }
          }
        });
      });
    });
  });
  next();
};



