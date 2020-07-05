'use strict';

const { ChannelDistributor } = require('./class/channelDistributor.js');
const { MainDistributor } = require("./class/mainDistributor");
const { Distributor } = require("./class/distributor");
const { ReactionDistributor } = require('./class/emojiDistributor');
const { pingPong } = require("./fn/pingPong");
const { writeCheckStorage } = require('./fn/checkStorageWrite.js');
const { readCheckStorage } = require('./fn/checkStorageRead.js');
const { startCollect, stopCollect, showCollected } = require('./fn/collector.js');
const { printer } = require('./fn/printer.js');
const { amazing } = require('./fn/thisIsAmazing.js');
const { solution } = require('./fn/solution.js');

const emojiDistributor = Distributor.create(printer);

const collectorDistributor = Distributor.create(
    (channel) => {
        channel.getCurrentPoll().addUserMessage(channel.getMessage().content);
        // console.log('message has been collected!');
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
    .add('write', writeCheckStorage)
    .add('read', readCheckStorage)
    .add('startNewPoll', startCollect)
    .add('showNewPoll', showCollected)
    .add('this_is_amazing!', amazing)
    .add('solution', solution);

const mainDistributor = MainDistributor.create(defaultDistributor)
    .add('collectorFlag', collectorDistributor)
    .add('emojiFlag', emojiDistributor);
    
const reactionDistributor = new ReactionDistributor();

const channelDistributor = new ChannelDistributor(mainDistributor, reactionDistributor);

module.exports = {
    channelDistributor,
}