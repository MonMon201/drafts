'use strict';
require('dotenv').config();
const Discord = require('discord.js');
const handler = require('./src/handler.js');

const client = new Discord.Client();

client.on('message', message => {
  handler.wrapper(message, client);
});

client.login(process.env.TOKEN);
