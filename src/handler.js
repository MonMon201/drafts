'use strict'

const { pong } = require('./fn/pong.js');
const { Distributor } = require('./class/distributor.js');
const { Handler } = require('./class/handler.js');
const { startCollect, stopCollect, showCollected } = require('./fn/collector.js');
const { defaultFn, collect, markCollected } = require('./fn/defaultFn.js')

const defaultDistrubutor = Distributor.create(defaultFn)
  .add('start', startCollect)
  .add('ping', pong)
  .add('show', showCollected);

const collectorDistributor = Distributor.create(collect)
  .add('stop', stopCollect);

const markerDistributor = Distributor.create(markCollected);

const handler = Handler.create(defaultDistrubutor)
  .add('collector', collectorDistributor)
  .add('marker', markerDistributor);

const wrap = {
    storedFlags : {
      collector : false,
      marker : false,
    },
    storedMessages : [],
    mark : 0,
    message : null,
    client : null,
}

module.exports = {
  wrap,
  handler,
}