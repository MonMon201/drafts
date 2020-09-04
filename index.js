'use strict';
require('dotenv').config();
const Discord = require('discord.js');
const { channelDistributor } = require('./src/mainDistributor.js');
const client = new Discord.Client();

client.on('ready', () => {
    channelDistributor.setClient(client);
    console.log('ready!');
});

// let msg = null;

client.on('message', (message) => {

    // Message log
    console.log(
        '_____________' +
        '\nNew Message:' +
        '\nAuthor: ' + message.author.tag +
        '\nContent: ' + message.content +
        '\nGuild: ' + message.guild.name +
        '\nChannel: ' + message.channel.name +
        '\n_____________'
    );

    channelDistributor.controller(message);

    // console.log(message.author.tag);
    // console.log(client);
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

client.on('messageReactionAdd', (messageReaction, user) => {
    if(user.tag !== 'Polly#6467'){
        channelDistributor.emojiInController(messageReaction, user);
    }
    // incomingReaction(messageReaction, user);
    // console.log(messageReaction);
});

client.on('messageReactionRemove', (messageReaction, user) => {
    if(user.tag !== 'Polly#6467'){
        channelDistributor.emojiOutController(messageReaction, user);
    }
    // console.log(messageReaction.message);
    // outgoingReaction(messageReaction, user);
    // console.log(messageReaction.users);
});

client.login(process.env.TOKEN);