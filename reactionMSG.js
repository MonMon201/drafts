'use strict';

const Discord = require('discord.js');
const reactionMSG = require('./src/reactionMSG');
require('dotenv').config()
const {createReactionMSG} = require('./src/createMSG.js');

const client = new Discord.Client();
 
client.on('message', message => {
    console.log(message.content);
});

client.login(process.env.TOKEN);