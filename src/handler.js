'use strict'

const {pingPong} = require("./function/pingPong.js"); 

const defaultDistributor = message => {
    const content = message.content;
    return (({
        'ping': pingPong,
    }[content] || (() => console.log('no such command: ' + content)))(message));
};

module.exports = {
    defaultDistributor,
};