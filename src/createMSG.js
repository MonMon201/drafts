'use strict'

const createReactionMessage = (message) => {
    if(message.author.username !== 'Danias-Test-Bot'){
        if(message.content === 'ping'){
            console.log(message.content);
            const channelID = message.channel.id;
            const channel = client.channels.cache.get(channelID);
            channel.send("pong");
        }
    }
    else{
        message.react('😄');
    }
};

module.exports = {
    createReactionMessage,
}