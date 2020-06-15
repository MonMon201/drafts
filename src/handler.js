'use strict'

const messageWrap = {
    flagsCollection : {
        collectorFlag : false,
    },
    collectedMessages : [],
    message : null,
};

const {pingPong} = require("./function/pingPong.js"); 

const defaultDistributor = messageWrap => {
    const content = messageWrap.message.content;
    return (({
        'ping': pingPong,
    }[content] || (() => console.log('no such command: ' + content)))(messageWrap));
};

const wrapper = message => {
    messageWrap.message = message;
    defaultDistributor(messageWrap); 
}

module.exports = {
    wrapper,
};