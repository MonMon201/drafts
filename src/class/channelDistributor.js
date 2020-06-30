'use strict';

const { Channel } = require("./channel.js");

class ChannelDistributor{
    constructor(mainDistributor){
        this.channels = [];
        this.mainDistributor = mainDistributor;
        this.client = null;
    }

    setClient(client){
        this.client = client;
    }

    controller(message){
        const length = this.channels.length;
        for(let i = 0; i < length; i++){    //Check if such channel is handled
            const idx = message.channel.id === this.channels[i].getId() ? true : false;
            if(idx){
                //If such channel is handled 
                //We update the last message and send channel to the main handler
                this.channels[i].setMessage(message);
                this.mainDistributor.controller(this.channels[i]);
                return;
            }
        }
        //If such channel is not handled we add a new one
        this.addChannel(message);
        this.mainDistributor.controller(this.channels[length]);
    }

    addChannel(message){
        const channel = new Channel(this.client, message);
        const flags = this.mainDistributor.getDistributorsFlags();
        for(let i = 0; i < flags.length; i++){  //setting all distributor flags to the channel
            channel.addFlag(flags[i], false);
        }
        this.channels.push(channel);
    }
}

module.exports = {
    ChannelDistributor,
}