'use strict';

const { Channel } = require("./class/channel");
const channelDistributor = require("./class/channelDistributor");

const handler = async (client, message) => {
    
    // Waiting for client and message to come
    await client;
    await message;
    
    // Message log
    console.log(
        '_____________' +
        '\nNew Message:' +
        '\nAuthor: ' + message.author.tag +
        '\nContent: ' + message.content +
        '\nGuild: ' + message.guild.name +
        '\nChannel: ' + message.channel.name +
        '\n_____________'
    );

    let idx = false;
    let channel;
    
    if(!idx){
        channel = Channel.create(client, message);
        idx = true;
    } else{
        channel.setMessage(message);
    }
    // console.log(channel);
    // channelDistributor.controller(message, client);
    // let msg = message.content;
    // msg = msg.split(' ');
    // const name = msg[0];
    // const command = msg[1];
    // const args = msg[2];
    // if(name === 'Polly')
    // console.log('command: ' + command + '\nargs: ' + args);
}

module.exports = {
    handler,
}