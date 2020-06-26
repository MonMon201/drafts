'use strict';

const Discord = require('discord.js');
const { incomingReaction, outgoingReaction, Poll, } = require('./src/handler.js');
require('dotenv').config();

const client = new Discord.Client();
const poll = new Poll();
const channelId = '477131735235297302';

client.on('ready', () => {
    console.log('ready');
});

client.on('message', message => {
    if(message.author.username !== "Danias-Test-Bot"){
        console.log(message.content);
        const channel = client.channels.cache.get(channelId);
        channel.send(message.content);
    }
    else if(message.author.username === "Danias-Test-Bot"){
        poll.addMessage(message, '➕');
        // message.react('➕');
    }
    //  createReaction...(message, filter, option) - 1-2 are required 
    //  3 - is optional (there is a timer in this case)
});

client.on('messageReactionAdd', (messageReaction, user) => {
    // incomingReaction(messageReaction, user);
    poll.addReaction(messageReaction, user);
    // console.log(messageReaction);
});

client.on('messageReactionRemove', (messageReaction, user) => {
    // console.log(messageReaction.message);
    // outgoingReaction(messageReaction, user);
    poll.removeReaction(messageReaction, user);
    // console.log(messageReaction.users);
});

setTimeout(() => {
    const channel = client.channels.cache.get(channelId);
    let obj = poll.getMessages();
    obj = JSON.stringify(obj);
    channel.send(obj);
}, 20000)

client.login(process.env.TOKEN);