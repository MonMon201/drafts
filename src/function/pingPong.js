'use strict'

const pingPong = (messageWrap) => {
    console.log(messageWrap.message.content + ' pong');
};

module.exports = {
    pingPong,
};