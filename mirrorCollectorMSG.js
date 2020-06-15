'use strict';

const Discord = require('discord.js');
require('dotenv').config()

const handler = require("./src/handler.js");

const client = new Discord.Client();

client.on('message', message => {
    if(message.author.username!=="Danias-Test-Bot")
    handler.wrapper(message, client);
});

client.login(process.env.TOKEN);