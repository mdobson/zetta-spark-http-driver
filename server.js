var zetta = require('zetta');
var Spark = require('./index.js');

zetta()
  .use(Spark, process.env.SPARK_USER, process.env.SPARK_PASS)
  .listen(1337);
