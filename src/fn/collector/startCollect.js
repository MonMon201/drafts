'use strict';

const { Poll } = require('../../class/single/poll');

const startCollect = (channel) => {
    // console.log(channel.getPolls());
    const argument = channel.getRequest().args[0];
    if(argument){
        const poll = new Poll(argument);
        channel.addPoll(poll);
        channel.setFlag('collectorFlag', true);
    } else{ //not sure about that. I maybe I would like to have unnamed polls
        channel.getMessage().reply('poll name can\'t be empty!');
    }
    // console.log(channel.getFlags());
    // console.log('collector flag is set up!');
    // console.log(channel.getCurrentPoll());
};

module.exports = {
    startCollect,
}