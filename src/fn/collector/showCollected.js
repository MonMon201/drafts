'use strict';

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

module.exports = {
    showCollected,
}