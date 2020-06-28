'use strict';

const writeCheckStorage = (channel) => {
    const message = channel.getMessage();
    channel.setCheckStorage(message.content);
    message.reply('check storage is set successfully!');
};

module.exports = {
    writeCheckStorage,
};