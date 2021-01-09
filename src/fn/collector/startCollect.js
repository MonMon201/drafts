'use strict';

const { Poll } = require('../../class/single/poll');

const startCollect = (channel) => {
    const argument = channel.getRequest().args[0];
    if(argument){
        const poll = new Poll(argument);
        channel.addPoll(poll);
        channel.setFlag('collectorFlag', true);
    } else{ //not sure about that. Maybe I would like to have unnamed polls
        channel.getMessage().reply('poll name can\'t be empty!');
    }
};

module.exports = {
    startCollect,
}