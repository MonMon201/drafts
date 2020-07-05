'use strict';

const printer = async channel => {

    const message = channel.getMessage();

    const dest = await channel.getClient().channels.cache.get(channel.getId());
    
    const userMessages = channel.getCurrentPoll().getUserMessages();

    if(channel.getCurrentPoll().getMessageControl()){
            if(userMessages.length === 0){
                message.react('➕');
                channel.setFlag('emojiFlag', false);
                await channel.getCurrentPoll().addMessage(message, '➕');
                // console.log(channel.getCurrentPoll().getMessages());
                return;
            } else if(message.author.username === 'Polly'){
                await message.react('➕');
                await dest.send(userMessages.shift());
                channel.getCurrentPoll().addMessage(message, '➕');
            } 
    } else{
        
        channel.getCurrentPoll().setMessageControl(true);

        dest.send(userMessages.shift());
    }
    
}

module.exports = {
    printer,
}