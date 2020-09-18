'use strict';

const incomingReaction = (messageReaction, user) => {
    console.log('incoming reaction!' + 
    '\n Username: ' + user.tag + 
    '\n Reaction: ' + messageReaction._emoji.name +
    '\n Message: ' + messageReaction.message.content 
    );
}

module.exports = {
    incomingReaction,
}