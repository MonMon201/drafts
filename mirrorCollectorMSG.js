'use strict';

const Discord = require('discord.js');
require('dotenv').config()

const handler = require("./src/handler.js");

const client = new Discord.Client();

client.on('message', message => {
    handler.wrapper(message);
});

client.login(process.env.TOKEN);