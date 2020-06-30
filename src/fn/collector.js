'use strict';

const { Poll } = require('../class/poll');

const startCollect = (channel) => {
    const poll = new Poll(channel.getMessage().content);
    channel.addPoll(poll);
    channel.setFlag('collectorFlag', true);
    // console.log(channel.getFlags());
    // console.log('collector flag is set up!');
    // console.log(channel.getCurrentPoll());
};

const stopCollect = (channel) => {
    channel.setFlag('collectorFlag', false);
    // console.log('collector flag is set down!');
};

const showCollected = (channel) => {
    
    channel.setFlag('emojiFlag', true);

    const dest = channel.getClient().channels.cache.get(channel.getId());

    dest.send('New poll:');
    
};

module.exports = {
    startCollect,
    stopCollect,
    showCollected,
};
