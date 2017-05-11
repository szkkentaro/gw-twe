'use strict'

const tty        = process.env.TTY;
const readline   = require('readline');
const Serialport = require('serialport');
const debuglog   = require('util').debuglog('gateway');
const Data       = require('model/data');

class Gateway {
  constructor(callback, data) {
    this.callback = callback;
    this.data = data || Data;
    this.serialport;
    this.readline;
  }
  handle(serialport, readline) {
    this.serialport = serialport || this.defaultSerialport();
    this.readline = readline || this.defaultReadline();
  }
  defaultSerialport() {
    // TODO inject tty, baudrate
    const sp = new Serialport(tty, {
      baudrate: 115200
    });
    sp.on('open', (err) => {
      if (err)
        debuglog(err);
      debuglog('%s is open', tty);
    });
    sp.on('error', (err) => debuglog(err));
    return sp;
  }
  defaultReadline() {
    const rl = readline.createInterface({
      input: this.serialport
    });
    rl.on('line', (line) => {
      debuglog('line : %s', line);
      const data = new this.data(line);
      this.callback(data);
    });
  }
}

module.exports = Gateway;
