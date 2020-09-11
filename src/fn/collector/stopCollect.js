'use strict';

const { Poll } = require('../../class/single/poll');

const stopCollect = (channel) => {
    channel.setFlag('collectorFlag', false);
    // console.log('collector flag is set down!');
};

module.exports = {
    stopCollect,
}