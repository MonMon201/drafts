'use strict';

const markCollected = (wrappedMessage) => {
    if(wrappedMessage.mark !== 0){
        if(wrappedMessage.message.author.username === 'Danias-Test-Bot'){
            wrappedMessage.message.react('👍');
            wrappedMessage.mark--;
        }
    }
    else{
        wrappedMessage.storedFlags.marker = false;
    }
}

module.exports = {
    markCollected,
};
