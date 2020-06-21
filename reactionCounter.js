'use strict';

const Discord = require('discord.js');
const { KeyObject } = require('crypto');
require('dotenv').config()

const client = new Discord.Client();

const filter = (reaction, user) => {
    return reaction.emoji.name === '➕';
    // ➕
};

let collector = null;
const reactionCounter = [];

client.on('ready', () => {
    console.log('ready');
});

client.on('message', message => {
    collector = message.createReactionCollector(filter, { time: 60000 }); 
    console.log(message.id);
    //  createReaction...(message, filter, option) - 1-2 are required 
    //  3 - is optional (there is a timer in this case)
});

client.on('messageReactionAdd', (messageReaction, user) => {
    // console.log('reaction!');
    console.log(messageReaction._emoji.name);
    console.log(user.tag);
});

client.login(process.env.TOKEN);