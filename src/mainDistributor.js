'use strict';

const { ChannelDistributor } = require('./class/distributor/channelDistributor.js');
const { MainDistributor } = require("./class/distributor/mainDistributor");
const { Distributor } = require("./class/distributor/distributor");
const { ReactionDistributor } = require('./class/distributor/emojiDistributor');
const { pingPong } = require("./fn/single/pingPong");
const { startCollect } = require('./fn/collector/startCollect.js');
const { stopCollect } = require('./fn/collector/stopCollect.js');
const { showCollected } = require('./fn/collector/showCollected.js');
const { solution } = require('./fn/single/solution.js');

const collectorDistributor = Distributor.create(
    (channel) => {
        channel.getCurrentPoll().addUserMessage(channel.getMessage().content);
    })
    .add('endNewPoll', stopCollect);

const defaultDistributor = Distributor.create((channel) => {
    const request = channel.getRequest();
    const content = 'wrong command';
    const message = channel.getMessage();
    if(message.content !== content && message.author.username !== 'Polly' && request.call === 'Polly'){
        message.reply(content);
    }
})
    .add('ping', pingPong)
    .add('startNewPoll', startCollect)
    .add('showNewPoll', showCollected)
    .add('solution', solution);

const mainDistributor = MainDistributor.create(defaultDistributor)
    .add('collectorFlag', collectorDistributor);
    
const reactionDistributor = new ReactionDistributor();

const channelDistributor = new ChannelDistributor(mainDistributor, reactionDistributor);

module.exports = {
    channelDistributor,
}