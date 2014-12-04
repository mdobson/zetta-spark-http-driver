# Zetta spark http driver

Http driver for the spark tinker firmware.

## Usage

```bash
$ npm install zetta-spark-http-driver
```

```javascript
var zetta = require('zetta');
var Spark = require('zetta-spark-http-driver');

zetta()
  .use(Spark, "<SPARK USERNAME>", "<SPARK PASSWORD>")
  .listen(1337);
```

## States and Transitions

- **online** - 
  - transitions
    - **digitalRead**
      - args: pin
      - desc: Read state of digital pin
    - **digitalWrite**
      - args: pin, state
      - desc: Write state of digital pin
    - **analogRead**
      - args: pin
      - desc: Read state of analog pin
    - **analogWrite**
      - args: pin, state
      - desc: Write state of analog pin
