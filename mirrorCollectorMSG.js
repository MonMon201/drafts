'use strict';
require('dotenv').config();
const Discord = require('discord.js');

const client = new Discord.Client();

client.on('ready', () => {
    console.log('yay!');
});

client.on('message', message => {
    if(message.author.username!=="Danias-Test-Bot")
    console.log('yay!');
});

client.login(process.env.TOKEN);
