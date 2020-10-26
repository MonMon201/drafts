'use strict';

require('dotenv').config();
const Discord = require('discord.js');
const { channelDistributor } = require('./src/mainDistributor.js');
const client = new Discord.Client();

client.on('ready', () => {
  channelDistributor.setClient(client);
  console.log('ready!');
});

// let msg = null;

client.on('message', message => {

  // Message log
  console.log(
    '_____________' +
        '\nNew Message:' +
        '\nAuthor: ' + message.author.tag +
        '\nContent: ' + message.content +
        '\nGuild: ' + message.guild.name +
        '\nChannel: ' + message.channel.name +
        '\n_____________',
  );

  channelDistributor.controller(message);
});

client.on('messageReactionAdd', (messageReaction, user) => {
  if (user.tag !== 'Polly#6467') {
    channelDistributor.emojiInController(messageReaction, user);
  }
});

client.on('messageReactionRemove', (messageReaction, user) => {
  if (user.tag !== 'Polly#6467') {
    channelDistributor.emojiOutController(messageReaction, user);
  }
});

client.login(process.env.TOKEN);
