'use strict';

const Discord = require('discord.js');
require('dotenv').config()
const {createReactionMSG} = require('./src/createMSG.js');

const client = new Discord.Client();
 
client.on('message', message => {
    createReactionMSG(message);
});

client.login(process.env.TOKEN);
/*
const channelID = message.channel.id;
const channel = client.channels.cache.get(channelID);
channel.send("pong");

const filter = (reaction) => {
	return reaction; //There we can set filter conditions
};

let collector = null;

client.on('message', message => {
    console.log(message.content);
    collector = message.createReactionCollector(filter, { time: 15000 }); 
    //  createReaction...(message, filter, option) - 1-2 are required 
    //  3 - is optional (there is a timer in this case)
});

client.on('messageReactionAdd', () => {
    console.log('reaction!');
    collector.on('collect', (reaction) => {
        console.log(`Collected ${reaction.emoji.name}`);
    });
    collector.on('end', collected => {  //this happens when timer ends
        console.log(`Collected ${collected.size} items`);
    });    
});
*/