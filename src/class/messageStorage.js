'use strict';

class Poll {
    constructor(){
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

                const idx = this.isThereTag(tag);

                if(idx === false){
                    
                    // Check if there is a user in storage
                    // Typecheck used to avoid 0 interpritating as false

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
                    
                    const idx = this.isThereTag(tag);

                        if(idx !== false){
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

        const messageId = message.id;

        this.messages.push({messageId : messageId, emoji : emoji, userStorage : []});
    
    }

    isThereTag(tag){
        for(let i = 0; i < this.messages.length; i++){
            if(!this.messages[i].userStorage.indexOf(tag)){
                return i;
            }
        }
        return false;
    }

    getMessages(){
        return this.messages;
    }

}

module.exports = {
    Poll,
}