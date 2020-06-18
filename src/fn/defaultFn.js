'use strict';

const defaultFn = (wrappedMessage) => {
    console.log('no such command: ' + wrappedMessage.message.content);
};

const collect = (wrappedMessage) => {
    wrappedMessage.storedMessages.push(wrappedMessage.message);
};

const markCollected = (wrappedMessage) => {
    if(wrappedMessage.storedMessages.length !== 0){
        if(wrappedMessage.message.author.username === 'Danias-Test-Bot'){
            wrappedMessage.message.react('👍');
            wrappedMessage.storedMessages.pop();
            if(wrappedMessage.storedMessages.length === 0){
                wrappedMessage.storedFlags.marker = false;
            }
        }
    }
}

module.exports = {
    defaultFn,
    collect,
    markCollected,
}