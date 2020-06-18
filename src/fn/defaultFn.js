'use strict';

const defaultFn = (wrappedMessage) => {
    console.log('no such command: ' + wrappedMessage.message.content);
};

const collect = (wrappedMessage) => {
    wrappedMessage.storedMessages.push(wrappedMessage.message);
};

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
    defaultFn,
    collect,
    markCollected,
}