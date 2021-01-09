'use strict';

const stopCollect = (channel) => {
    channel.setFlag('collectorFlag', false);
};

module.exports = {
    stopCollect,
}