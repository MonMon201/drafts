'use strict';

const { Poll } = require("./poll");

class Channel{
    constructor(id, lastMessage, client){
        this.id = id;
        this.lastMessage = lastMessage;
        this.polls = [];
        this.storedFlags = [];
        this.checkStorage = null;
        this.client = client;
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
        return this.id;
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