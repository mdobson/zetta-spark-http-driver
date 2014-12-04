var Device = require('zetta-device');
var util = require('util');

var SparkDriver = module.exports = function(spark) {
  Device.call(this);
  this._spark = spark;
  this.coreId = this._spark.id;
};
util.inherits(SparkDriver, Device);

SparkDriver.prototype.init = function(config) {
  config
    .type('spark-core')
    .state('online')
    .when('online', { allow: ['digitalWrite', 'digitalRead', 'analogRead', 'analogWrite'] })
    .map('digitalWrite', this.digitalWrite, [{type:'text', name:'pin'}, {type:'text', name: 'state'}])
    .map('digitalRead', this.digitalRead, [{type:'text', name:'pin'}])
    .map('analogRead', this.analogRead, [{type:'text', name:'pin'}])
    .map('analogWrite', this.analogWrite, [{type:'text', name:'pin'}, {type:'text', name:'val'}]);
};

SparkDriver.prototype.digitalWrite = function(pin, state, cb) {
  var args = [pin, state].join(':');
  this._spark.callFunction('digitalWrite', args, function(err) {
    cb();
  });
};

SparkDriver.prototype.digitalRead = function(pin, cb) {
  var self = this;
  var args = pin;
  this._spark.callFunction('digitalRead', args, function(err, value) {
    self[pin] = value;
    cb();
  });
};

SparkDriver.prototype.analogRead = function(pin, cb) {
  var self = this;
  var args = pin;
  this._spark.callFunction('analogRead', args, function(err, value) {
    self[pin] = value;
    cb();
  });
};

SparkDriver.prototype.analogWrite = function(pin, val, cb) {
  var args = [pin, value].join(':');
  this._spark.callFunction('analogWrite', args, function(err, value) {
    cb();
  });
};
