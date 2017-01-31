'use strict'

const moment = require('moment');

class Data {
  constructor(line) {
    this.line = line;
    // TODO handle time
    this._time = moment().format();
  }
  isValid() {
    // TODO move magic number
    return (this.line.length == 49);
  }
  info() {
    return {
      id:     this.id(),
      cmd:    this.cmd(),
      lqi:    this.lqi(),
      sender: this.sender(),
      time:   this.time(),
      volt:   this.volt(),
      status: this.status(),
    }
  }
  id() {
    return this.line.substr(1, 2);
  }
  cmd() {
    return this.line.substr(3, 2);
  }
  lqi() {
    return this.line.substr(9, 2);
  }
  sender() {
    return this.line.substr(11, 8);
  }
  // TODO handle time
  time() {
    return this._time;
    // return this.line.substr(21, 4);
  }
  volt() {
    return parseInt(this.line.substr(27, 4), 16);
  }
  status() {
    return this.line.substr(33, 2);
  }
}

module.exports = Data;
