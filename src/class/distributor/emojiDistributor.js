'use strict';

class ReactionDistributor{
    constructor(){
        
    }

    incomingReaction(channel){
        channel.getCurrentPoll().addReaction(channel);
        return;
    }

    outgoingReaction(channel){
        channel.getCurrentPoll().removeReaction(channel);
        return;
    }
}

module.exports = {
    ReactionDistributor,
}