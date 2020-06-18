'use strict'

const { pong } = require('./fn/pong.js');
const { Distributor } = require('./class/distributor.js');
const { Handler } = require('./class/handler.js');

const defaultFn = (wrappedMessage) => {
  console.log('no such command: ' + wrappedMessage.message.content);
}

const defaultDistrubutor = Distributor.create(defaultFn)
  .add('ping', pong);

const handler = Handler.create(defaultDistrubutor);

const wrapper = (message) => {
  const wrap = {
    storedFlags : {

    },
    message : message,
  }
  return wrap;
}

module.exports = {
  wrapper,
  handler,
}