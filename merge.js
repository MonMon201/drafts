'use strict';
require('dotenv').config();
const Discord = require('discord.js');
const { handler } = require('./src/handler.js');
const { channelDistributor } = require('./src/mainDistributor.js');

const client = new Discord.Client();

client.on('ready', () => {
    channelDistributor.setClient(client);
    console.log('ready!');
});

// let msg = null;

client.on('message', (message) => {
    // console.log(client);
    channelDistributor.controller(message);
    // handler(client, message);
    // if(message.content === 'explore'){
    //     console.log(msg.channel.id + '\n' + msg.guild.id);
    //     const channelID = msg.channel.id;
    //     const channel = client.channels.cache.get(channelID);
    //     const content = 'new message!\n from:\n channel name: ' + msg.channel.name + 
    //     '\n channel id: ' + msg.channel.id;  
    //     channel.send(content);
    // } else{
    //     console.log('new message!' + 
    //     '\n message content: ' + message.content +
    //     '\n author: ' + message.author.username
    //     );
    //     msg = message;
    // }
});

client.login(process.env.TOKEN);