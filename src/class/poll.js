'use strict';

class Poll {
    constructor(name){
        this.name = name;
        this.messages = [];
    }

    addReaction(messageReaction, user){

        for(let i = 0; i < this.messages.length; i++){
            const emoji = messageReaction._emoji.name;
            const messageId = messageReaction.message.id;
            // console.log('there is reaction in: ' + messageReaction.message.content);
            const tag = user.tag;
            // console.log(tag);
            if(this.messages[i].emoji === emoji){
                // Check if emoji is correct
                console.log(
                    '______________________' +
                    '\nuser storage state on: ' +  
                    '\n message: ' + messageReaction.message.content +
                    '\n user: ' + tag +
                    '\n message container: ' + this.messages[i].messageId +
                    '\n state: ' + this.messages[i].userStorage
                );

                let idx = false;

                for(let j = 0; j < this.messages.length; j++){
                    if(!this.messages[j].userStorage.indexOf(tag)){
                        idx = true;
                    }
                }

                if(!idx){
                    
                    // Check if there is a user in storage

                    if(this.messages[i].messageId === messageId){
                        // Check if this message is handled
                        this.messages[i].userStorage.push(tag);
                        console.log(
                        '\n______________________' +    
                        '\nreaction added' + 
                        '\n message: ' + messageReaction.message.content +
                        '\n user: ' + tag
                        );
                        
                    }
                }
            }
        }

    }

    removeReaction(messageReaction, user){
        for(let i = 0; i < this.messages.length; i++){
            const emoji = messageReaction._emoji.name;
            const messageId = messageReaction.message.id;
            const tag = user.tag;
            if(this.messages[i].emoji === emoji){
                // Check if emoji is correct
                if(this.messages[i].messageId === messageId){
                    // Check if this message is 

                    let idx = false;

                    for(let j = 0; j < this.messages.length; j++){
                        if(!this.messages[j].userStorage.indexOf(tag)){
                            idx = true;
                        }
                    }
                    

                        if(idx){
                            this.messages[idx].userStorage.splice(idx, 1);
                            console.log(
                            '\n________________________' +
                            '\nreaction removed' + 
                            '\n message: ' + messageReaction.message.content +
                            '\n user: ' + tag
                            );
                        }
                    
                }
            }
        }

    }

    addMessage(message, emoji){
        
        // ➕

        this.messages.push({message : message, emoji : emoji, userStorage : []});
    
    }

    getMessages(){
        return this.messages;
    }

    emptyMessages(){
        this.messages = [];
    }

    getName(){
        return this.name;
    }

}

module.exports = {
    Poll,
}