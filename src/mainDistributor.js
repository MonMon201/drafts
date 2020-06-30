'use strict';

const { ChannelDistributor } = require('./class/channelDistributor.js');
const { MainDistributor } = require("./class/mainDistributor");
const { Distributor } = require("./class/distributor");
const { pingPong } = require("./fn/pingPong");
const { writeCheckStorage } = require('./fn/checkStorageWrite.js');
const { readCheckStorage } = require('./fn/checkStorageRead.js');
const { startCollect, stopCollect, showCollected } = require('./fn/collector.js');
const { printer } = require('./fn/printer.js');
const { amazing } = require('./fn/thisIsAmazing.js');

const emojiDistributor = Distributor.create(printer);

const collectorDistributor = Distributor.create(
    (channel) => {
        channel.getCurrentPoll().addMessage(channel.getMessage().content, '➕');
        console.log('message has been collected!');
    })
    .add('endNewPoll', stopCollect);

const defaultDistributor = Distributor.create((channel) => {
    const content = 'wrong command';
    const message = channel.getMessage();
    if(message.content !== content && message.author.username !== 'Danias-Test-Bot'){
        message.reply(content);
    }
})
    .add('ping', pingPong)
    .add('write', writeCheckStorage)
    .add('read', readCheckStorage)
    .add('startNewPoll', startCollect)
    .add('showNewPoll', showCollected)
    .add('this_is_amazing!', amazing);

const mainDistributor = MainDistributor.create(defaultDistributor)
    .add('collectorFlag', collectorDistributor)
    .add('emojiFlag', emojiDistributor);

const channelDistributor = new ChannelDistributor(mainDistributor);

module.exports = {
    channelDistributor,
}