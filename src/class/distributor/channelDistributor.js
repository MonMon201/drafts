'use strict';

const { Channel } = require("../single/channel.js");

class ChannelDistributor{
    constructor(mainDistributor, reactionDistributor){
        this.channels = [];
        this.mainDistributor = mainDistributor;
        this.reactionDistributor = reactionDistributor;
        this.client = null;
        this.tmp = null;
    }

    setClient(client){
        this.client = client;
    }

    controller(message){
        for(let i = 0; i < this.channels.length; i++){    
            if(message.channel.id === this.channels[i].getId()){    //Check if such channel is handled
                //If such channel is handled 
                //We update the last message and send channel to the main handler
                this.channels[i].setMessage(message);
                this.mainDistributor.controller(this.channels[i]);
                return;
            }
        }
        //If such channel is not handled we add a new one
        this.addChannel(message);
        this.mainDistributor.controller(this.channels[this.channels.length-1]);
    }

    addChannel(message){
        const channel = Channel.create(this.client, message);
        const flags = this.mainDistributor.getDistributorsFlags();
        for(let i = 0; i < flags.length; i++){  //setting all distributor flags to the channel
            channel.addFlag(flags[i], false);
        }
        this.channels.push(channel);
    }
    
    emojiInController(messageReaction, user){
        const message = messageReaction.message;
        // this.tmp = message;
        // if(user.tag === 'monmon213#7037'){
        //     if(this.tmp.channel.id === message.channel.id){
        //         console.log('________________________');
        //         console.log('Messages are equal!');
        //         console.log('________________________');
        //     } else{
        //         console.log('________________________');
        //         console.log('Messages are not equal!');
        //         // console.log(this.tmp.id);
        //         // console.log(message.id);
        //         console.log('________________________');
        //     }
        // }
        for(let i = 0; i < this.channels.length; i++){
            if(message.channel.id === this.channels[i].getId()){
                //Check what channel handles this message
                let poll = this.channels[i].getCurrentPoll();
                //Getting poll to check if there is some
                if(poll){
                    const userMessages = poll.getMessages();
                    console.log(userMessages)
                    for(let j = 0; j < userMessages.length; j++){
                        //Check if there is a message in the current poll handled
                        // if(user.tag === 'monmon213#7037'){
                        //     // console.log('here!');  
                        //     console.log(message.id); 
                        //     console.log(wrappedMessages[j].message.id);
                        //     console.log(wrappedMessages);
                        // }
                        
                        if(message.id === userMessages[j].message.id){
                            this.channels[i].setReaction(messageReaction, user);
                            this.reactionDistributor.incomingReaction(this.channels[i]);
                        }
                    }
                }
            }
        }
    }

    emojiOutController(messageReaction, user){
        const message = messageReaction.message;
        // this.tmp = message;
        // if(user.tag === 'monmon213#7037'){
        //     if(this.tmp.channel.id === message.channel.id){
        //         console.log('________________________');
        //         console.log('Messages are equal!');
        //         console.log('________________________');
        //     } else{
        //         console.log('________________________');
        //         console.log('Messages are not equal!');
        //         // console.log(this.tmp.id);
        //         // console.log(message.id);
        //         console.log('________________________');
        //     }
        // }
        for(let i = 0; i < this.channels.length; i++){
            if(message.channel.id === this.channels[i].getId()){
                //Check what channel handles this message
                let poll = this.channels[i].getCurrentPoll();
                //Getting poll to check if there is some
                if(poll){
                    const userMessages = poll.getMessages();
                    for(let j = 0; j < userMessages.length; j++){
                        //Check if there is a message in the current poll handled
                        // if(user.tag === 'monmon213#7037'){
                        //     // console.log('here!');  
                        //     console.log(message.id); 
                        //     console.log(wrappedMessages[j].message.id);
                        //     console.log(wrappedMessages);
                        // }
                        
                        if(message.id === userMessages[j].message.id){
                            this.channels[i].setReaction(messageReaction, user);  
                            this.reactionDistributor.outgoingReaction(this.channels[i]);
                        }
                    }
                }
            }
        }
    }
}

module.exports = {
    ChannelDistributor,
}