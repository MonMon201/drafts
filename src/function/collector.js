const startCollect = (messageWrap) => {
    messageWrap.flagsCollection.collectorFlag = true;
};

const stopCollect = (messageWrap) => {
    messageWrap.flagsCollection.collectorFlag = false;
};

const showCollected = (messageWrap) => {
    const channelID = messageWrap.message.channel.id;
	const channel = messageWrap.client.channels.cache.get(channelID);
	const collectedMessages = messageWrap.collectedMessages.toArray()
	console.log(collectedMessages)
    for(let i = 0; i < collectedMessages.length; i++){
        const content = collectedMessages[i].content;
        channel.send(content);
        }
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
