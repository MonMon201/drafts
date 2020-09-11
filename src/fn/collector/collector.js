'use strict';

const { Poll } = require('../../class/single/poll.js');

const showCollected = async (channel) => {

    const currentPoll = channel.getCurrentPoll();

    const dest = channel.getClient().channels.cache.get(channel.getId());

    if(currentPoll && currentPoll.getUserMessages().length > 0){
    
        const name = currentPoll.getName();
    
        await dest.send('New poll:\n ' + name + ':');

        const userMessages = channel.getCurrentPoll().getUserMessages();

        for await(let userMessage of userMessages){
            const sentMessage = await dest.send(userMessage);
            const emoji = await sentMessage.react('➕');
            currentPoll.addMessage(sentMessage, emoji);
        }

    } else {

        await dest.send('No options in poll, sorry :(');

    }
    
};

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

const stopCollect = (channel) => {
    channel.setFlag('collectorFlag', false);
    // console.log('collector flag is set down!');
};

module.exports = {
    stopCollect,
    startCollect,
    showCollected,
}