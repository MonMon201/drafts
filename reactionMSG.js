'use strict';

const Discord = require('discord.js');
const { handler, wrap } = require('./src/handler.js');
require('dotenv').config()


const client = new Discord.Client();
 
client.on('message', message => {
    wrap.message = message
    handler.controller(wrap);
});

client.on('ready', () => {
    console.log('ready!');
    wrap.client = client;
});

client.login(process.env.TOKEN);