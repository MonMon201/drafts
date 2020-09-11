'use strict';

const readCheckStorage = (channel) => {
    channel.getMessage().reply('check storage content: ' + channel.getCheckStorage());
}

module.exports = {
    readCheckStorage,
}