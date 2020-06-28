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
        for(let i = 0; i < length; i++){
            const idx = message.channel.id === this.channels[i].getId() ? true : false;
            if(idx){
                this.channels[i].setMessage(message);
                this.mainDistributor.controller(this.channels[i]);
                return;
            }
        }
        this.addChannel(message.channel.id, message);
        this.mainDistributor.controller(this.channels[length]);
    }

    addChannel(id, message){
        const channel = new Channel(id, message, this.client);
        const flags = this.mainDistributor.getDistributorsFlags();
        for(let i = 0; i < flags.length; i++){  //setting all distributor flags
            channel.addFlag(flags[i], false);
        }
        this.channels.push(channel);
    }
}

module.exports = {
    ChannelDistributor,
}