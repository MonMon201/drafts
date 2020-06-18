'use strict';

const Discord = require('discord.js');
require('dotenv').config()

const client = new Discord.Client();
 
client.on('message', message => {
    console.log(message.content);
});

client.login(process.env.TOKEN);