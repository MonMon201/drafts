'use strict';

class Handler{
    constructor(defaultDistrubutor){
        this.distributors = [];
        this.defaultDistrubutor = defaultDistrubutor;
    }

    static create(defaultDistrubutor){
        return new Handler(defaultDistrubutor);
    }

    add(key, value){// key === flag of the distributor, will be the system of connection keys-distributors
        this.distributors.push({key : key, value : value});
        return this;
    }

    controller(wrappedMessage){
        const content = wrappedMessage.message.content;
        for(let key in wrappedMessage.storedFlags){
            // console.log('pong!');
            if(wrappedMessage.storedFlags[key]){ // if some flag is up this will happen
                // console.log('pong!');
                for(let i = 0; i < this.distributors.length; i++){
                    console.log(key)
                    if(this.distributors[i].key===key){
                        return this.distributors[i].value.controller(wrappedMessage);
                    }
                }
            }
        }
        return this.defaultDistrubutor.controller(wrappedMessage);
    }
}

module.exports = {
    Handler,
}