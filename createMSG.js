'use strict';

const Discord = require('discord.js');
require('dotenv').config()

const client = new Discord.Client();
 
client.on('message', message => {
    if(message.content === "ping"){
        // console.log(message.channel.id);
        const channelID = message.channel.id;
        const channel = client.channels.cache.get(channelID);
        channel.send("pong");
    }
});

client.login(process.env.TOKEN);