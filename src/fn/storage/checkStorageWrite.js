'use strict';

const writeCheckStorage = (channel) => {
    const message = channel.getMessage();
    const request = channel.getRequest();
    channel.setCheckStorage(request.args[0]);
    message.reply('checkstorage is set successfully!');
};

module.exports = {
    writeCheckStorage,
};