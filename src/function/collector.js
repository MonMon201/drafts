const startCollect = (messageWrap) => {
    messageWrap.flagsCollection.collectorFlag = true;
};

const stopCollect = (messageWrap) => {
    messageWrap.flagsCollection.collectorFlag = false;
};

const showCollected = (messageWrap) => {
    const channelID = messageWrap.message.channel.id;
    const channel = messageWrap.client.channels.cache.get(channelID);
    if(messageWrap.collectedMessages.length){
        for(let i = 0; i < messageWrap.collectedMessages.length; i++){
            const content = messageWrap.collectedMessages[i].content;
            channel.send(content);
        }
        messageWrap.collectedMessages = [];
    }
    else{
        channel.send('There is nothing collected!');
    }
};

module.exports = {
    startCollect,
    stopCollect,
    showCollected,
};