'use strict';

class Poll {
    constructor(name){
        this.name = name;
        this.messages = [];     // {message, emoji, [user tags]}
        this.userMessages = []; // [messages' content];
        this.multiVote = [];   // {reactionMessage, user}
        this.messageControl = false // message control for printer function
        // reactionMessage needed to identify which message was multivoted, so we can
        // add feature, when if person removes his first vote, we make the last standing one the first one
    }

    addReaction(channel){
        const reaction = channel.getReaction();
        const messageReaction = reaction.messageReaction;
        const user = reaction.user;

        let idx = true;

        for(let i = 0; i < this.messages.length; i++){
            for(let j = 0; j < this.messages[i].userStorage.length; j++){
                // Check if user voted for some option already.
                if(this.messages[i].userStorage[j] === user.tag){
                    // We need idx to check the whole array
                    // If we use 'else', we won't check the whole array
                    idx = false;

                    // this.multiVote.push(messageReaction, user);
                    // multivote feat will be in process after main features will be done

                    console.log(
                        user.tag + ' multi voted!' +
                        '\non message: ' + messageReaction.message
                    );
                }
            }
        }
        
        if(idx){
            // If this is the first vote of user - adding him to this.messsages, to mark the vote.
            for(let i = 0; i < this.messages.length; i++){
                if(this.messages[i].message.id === messageReaction.message.id){
                    this.messages[i].userStorage.push(user.tag);
                    console.log(
                        '_____________' +
                        '\nnew reaction!' +
                        '\non message ' + messageReaction.message.content +
                        '\nby user ' + user.tag
                        );
                }
            }
        }
    }

    removeReaction(channel){
        const reaction = channel.getReaction();
        const messageReaction = reaction.messageReaction;
        const user = reaction.user;

        for(let i = 0; i < this.messages.length; i++){
            // Check which messages' reaction was removed
            if(this.messages[i].message.id === messageReaction.message.id){

            for(let j = 0; j < this.messages[i].userStorage.length; j++){
                // Check if user voted for some option already.
                if(this.messages[i].userStorage[j] === user.tag){        
                        
                        this.messages[i].userStorage.splice(j, 1); 

                        console.log(
                            '_____________' +
                            '\nremoved reaction!' +
                            '\non message ' + messageReaction.message.content +
                            '\nby user ' + user.tag
                            );
                    }
                }
            }
        }

    }

    solution(channel){
        const amounts = [];
        const messages = channel.getCurrentPoll().getMessages();
        // console.log(messages);
        for(let i = 0; i < messages.length; i++){
            amounts.push({ key : i, value : messages[i].userStorage.length})
        }
        amounts.sort((a, b) => b.value -  a.value);
        
        let biggest = [];
        // biggest numbers now are at the beginning of an array, so
        // we can collect equal biggest numbers to an array, and then
        // random an answer
        // console.log(amounts);
        for(let i = 0; i < amounts.length; i++){
            if(amounts[0].value === amounts[i].value){
                biggest.push(amounts[i].key);
            }
        }
        // console.log(biggest);
        if(biggest.length > 1){
            const idx = Math.floor(Math.random() + (biggest.length-1)); 
            console.log(idx);
            // getting a random integer from 0 to biggest.length
            // console.log(messages[idx]);
            return messages[biggest[idx]].message.content;
        } else{
            return messages[biggest[0]].message.content;
        }

    }

    addMessage(message, emoji){
        
        // ➕

        this.messages.push({message : message, emoji : emoji, userStorage : []});
    
    }

    getMessages(){

        return this.messages;

    }

    addUserMessage(message){

        this.userMessages.push(message);
    
    }

    getUserMessages(){

        return this.userMessages;

    }

    emptyMessages(){

        this.messages = [];

    }

    getName(){

        return this.name;

    }

    getMessageControl(){
        return this.messageControl;
    }
    
    setMessageControl(value){
        this.messageControl = value;
    }

}

module.exports = {
    Poll,
}