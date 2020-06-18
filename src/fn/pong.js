'use strict';

const pong = (wrappedMessage) => {
    wrappedMessage.message.reply('pong');
}

module.exports = {
    pong,
}