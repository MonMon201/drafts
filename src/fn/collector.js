const startCollect = (messageWrap) => {
    messageWrap.storedFlags.collector = true;
};

const stopCollect = (messageWrap) => {
    messageWrap.storedFlags.collector = false;
};

const showCollected = (wrappedMessage) => {
    wrappedMessage.storedFlags.marker = true;
    wrappedMessage.mark = wrappedMessage.storedMessages.length;
    const channelID = wrappedMessage.message.channel.id;
	const channel = wrappedMessage.client.channels.cache.get(channelID);
    const storedMessages = wrappedMessage.storedMessages;
    for(let i = 0; i < storedMessages.length; i++){
        const content = storedMessages[i].content;
        channel.send(content);
    }
};


module.exports = {
    startCollect,
    stopCollect,
    showCollected,
};
