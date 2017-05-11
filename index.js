'use strict'

const moment   = require('moment');
const firebase = require('firebase');
const config   = require('config/firebase');
const db       = firebase.initializeApp(config).database();
const Gateway  = require('lib/gateway');
const debuglog = require('util').debuglog('index');

const path     = (data) => `/${data.id()}/${data.sender()}`;

// as you like
const callback = (data) => {
  debuglog(data.info());

  if (!data.isValid())
    return;

  // send data to firebase
  db.ref(`/info/${path(data)}`).set(data.info());
  db.ref(`/stats/${path(data)}`).transaction((val) => {
    let state = (data.status() == "00") ? "open" : "close";
    if (val === null || val.state !== state)
      return { state: state, time: data.time() };
    // duration
    debuglog(moment(val.time).toNow());
  });
}

new Gateway(callback).handle();
