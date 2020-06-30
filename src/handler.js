'use strict';

const { Channel } = require("./class/channel");
const channelDistributor = require("./class/channelDistributor");

const handler = (client, message) => {
    const channel = Channel.create(client, message);
    console.log(channel);
    // // channelDistributor.controller(message, client);
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