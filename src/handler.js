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

const flagCheck = messageWrap => {
    for(let key in messageWrap.flagsCollection){
        if(messageWrap.flagsCollection[key]){
            console.log('true in ' + key);
            return;
        }
    }
    return defaultDistributor(messageWrap);
}

const wrapper = message => {
    messageWrap.message = message;
    flagCheck(messageWrap); 
}

module.exports = {
    wrapper,
};