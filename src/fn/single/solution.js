'use strict';

const solution = async (channel) => {
    
    const content = channel.getCurrentPoll().solution(channel);
    
    const dest = await channel.getClient().channels.cache.get(channel.getId());

    await dest.send('the solution is: ' + content);

};

module.exports = {
    solution,
}