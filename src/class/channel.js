'use strict';

const { Poll } = require("./poll");

class Channel{
    constructor(client, lastMessage, request){
        this.client = client;
        this.lastMessage = lastMessage;
        this.request = {
            command : request.command,
            args : request.args,
        };
        this.storedFlags = [];
        this.polls = [];
        this.checkStorage = null;
    }

    static create(client, lastMessage){
        let msg = lastMessage.content.split(' ');
        const request = {
            command : null,
            args : [],
        }
        if(msg[0] === 'Polly'){
            request.command = msg[1];
            for(let i = 2; i < msg.length; i++){
                request.args.push(msg[i]);
            }
        }

        return new Channel(client, lastMessage, request);
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

    getPolls(){
        return this.polls;
    }

    getId(){
        return this.lastMessage.channel.id;
    }

    setMessage(message){
        this.lastMessage = message;
        let unWorkedRequest = message.content.split(' ');
        this.request = {
            command : null,
            args : [],
        }
        // Check if someone is asking Polly about something
        if(unWorkedRequest[0] === 'Polly'){
            this.request.command = unWorkedRequest[1];
            for(let i = 2; i < unWorkedRequest.length; i++){
                this.request.args.push(unWorkedRequest[i]);
            }
        }
    }

    getRequest(){
        return this.request;
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