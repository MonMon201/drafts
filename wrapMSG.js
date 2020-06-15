'use strict';

const Discord = require('discord.js');
require('dotenv').config()

const client = new Discord.Client();

const messageWrap = {
    flagsCollection : {
        collectorFlag : false,
    },
    collectedMessages : [],
    message : null,
};

const pingPong = () => {
    console.log('pong');
};

const defaultDistributor = messageWrap => {
    const content = messageWrap.message.content;
    return (({
        'ping': pingPong,
    }[content] || (()=>console.log('no such command: ' + content)))(messageWrap));
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

const wrapper = message => {
    messageWrap.message = message;
    flagCheck(messageWrap); 
}

client.on('message', message => {
    console.log(message.content);
    wrapper(message);
});

client.login(process.env.TOKEN);