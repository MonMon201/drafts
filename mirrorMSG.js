'use strict';

const Discord = require('discord.js');
require('dotenv').config()

const client = new Discord.Client();
 
client.on('message', message => {
    if(message.author.username !== "Danias-Test-Bot"){
        // console.log(message);
        const channelID = message.channel.id;
        const channel = client.channels.cache.get(channelID);
        channel.send(message.content);
    }
});

client.login(process.env.TOKEN);