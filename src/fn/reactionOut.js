'use strict';

const outgoingReaction = (messageReaction, user) => {
    console.log('outgoing reaction!' + 
    '\n Username: ' + user.tag + 
    '\n Reaction: ' + messageReaction._emoji.name +
    '\n Message: ' + messageReaction.message.content
    );
}

module.exports = {
    outgoingReaction,
}