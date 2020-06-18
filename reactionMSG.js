'use strict';

const Discord = require('discord.js');
const { handler, wrap } = require('./src/handler.js');
require('dotenv').config()

const client = new Discord.Client();
 
client.on('message', message => {
    wrap.message = message;
    handler.controller(wrap);
});

client.on('ready', () => {
    wrap.client = client;
    console.log('ready!');
});

client.login(process.env.TOKEN);