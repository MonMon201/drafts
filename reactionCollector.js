'use strict';

const Discord = require('discord.js');
require('dotenv').config()

const client = new Discord.Client();

const collectorCreator = (message, collector) =>{
    collector = new Discord.ReactionCollector(message, () =>{});
    return collector;
}

let collector = null;

client.on('message', message => {
    console.log(message.content);
    if(!collector)
    collector = collectorCreator(message, collector) 
});

client.on('messageReactionAdd', () => {
    console.log('reaction!');    
});



client.login(process.env.TOKEN);