'use strict';

const printer = async channel => {

    const message = await channel.getMessage();

    if(message.author.username === 'Danias-Test-Bot'){

        const userMessages = channel.getCurrentPoll().getUserMessages();
        // console.log(userMessages);
        if(userMessages.length === 0){
            channel.getMessage().react('➕');
            channel.setFlag('emojiFlag', false);
            channel.getCurrentPoll().addMessage(message, '➕');
            // console.log(channel.getCurrentPoll().getMessages());
            return;
        }
    
        const dest = channel.getClient().channels.cache.get(channel.getId());
    
        await dest.send(userMessages.shift());
    
        await channel.getMessage().react('➕');
        
    };
    
}

module.exports = {
    printer,
}