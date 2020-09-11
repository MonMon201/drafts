'use strict'

const pingPong = (channel) => {
    channel.getMessage().reply('pong');
};

module.exports = {
    pingPong,
};