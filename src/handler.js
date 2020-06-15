'use strict'

const messageWrap = {
    flagsCollection : {
        collectorFlag : false,
    },
    collectedMessages : [],
    client: null,
    message : null,
};

const {pingPong} = require("./function/pingPong.js");
const {startCollect, stopCollect, showCollected} = require("./function/collector.js");

const collecterDistributor = messageWrap => {
    const content = messageWrap.message.content;
    return (({
        '/stopCollect' : stopCollect,
    }[content] || (() => messageWrap.collectedMessages.push(messageWrap.message)))(messageWrap));
};

const defaultDistributor = messageWrap => {
    const content = messageWrap.message.content;
    return (({
        'ping': pingPong,
        '/startCollect' : startCollect,
        '/showCollected' : showCollected,
    }[content] || (() => console.log('no such command: ' + content)))(messageWrap));
};

const flagCheck = messageWrap => {
    for(let key in messageWrap.flagsCollection){
        if(messageWrap.flagsCollection[key]){
            console.log('true in ' + key);
            return collecterDistributor(messageWrap);
        }
    }
    return defaultDistributor(messageWrap);
}

const wrapper = (message, client) => {
    console.log(message.content);
    messageWrap.message = message;
    messageWrap.client = client;
    flagCheck(messageWrap); 
}

module.exports = {
    wrapper,
};