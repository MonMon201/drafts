'use strict';

const { Poll } = require("./poll");

class Channel{
    constructor(client, lastMessage){
        this.client = client;
        this.lastMessage = lastMessage;
        this.request = {
            command : null,
            args : [],
        };
        this.storedFlags = [];
        this.polls = [];
        this.checkStorage = null;
    }

    static create(client, lastMessage){
        let msg = lastMessage.content.split(' ');
        const args = [];
        if(msg[0] === 'Polly'){
            const command = msg[1];
            for(let i = 2; i < msg.length; i++){
                args.push(msg[i]);
            }
        }
        return new Channel(client, lastMessage);
    }

    addFlag(key, value){   //key is a flag name, value is a state of the flag
        this.storedFlags.push({key : key, value: value}); 
    }

    setFlag(key, value){    //key is a flag name, and value is a state of the flag
        for(let i = 0; i < this.storedFlags.length; i++){
            if(this.storedFlags[i].key === key){
                this.storedFlags[i].value = value;
            } 
        }
    }

    getFlags(){
        return this.storedFlags;
    }

    addPoll(poll){
        this.polls.push(poll);
    }

    getCurrentPoll(){
        return this.polls[this.polls.length - 1];
    }

    getId(){
        return this.lastMessage.channel.id;
    }

    setMessage(message){
        this.lastMessage = message;
    }

    getMessage(){
        return this.lastMessage;
    }

    setCheckStorage(value){
        this.checkStorage = value;
    }

    getCheckStorage(){
        return this.checkStorage;
    }

    getClient(){
        return this.client;
    }
}

module.exports = {
    Channel,
}