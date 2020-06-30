'use strict';

const printer = async channel => {

    const message = await channel.getMessage();

    if(message.author.username === 'Danias-Test-Bot'){

        const messages = channel.getCurrentPoll().getMessages();
        
        if(messages.length === 0){
            channel.getMessage().react('➕');
            channel.setFlag('emojiFlag', false);
            return;
        }
    
        const dest = channel.getClient().channels.cache.get(channel.getId());
    
        await dest.send(messages.shift().message);
    
        await channel.getMessage().react('➕');
        
    };
    
}

module.exports = {
    printer,
}