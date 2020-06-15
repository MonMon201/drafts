const startCollect = (messageWrap) => {
    messageWrap.flagsCollection.collectorFlag = true;
};

const stopCollect = (messageWrap) => {
    messageWrap.flagsCollection.collectorFlag = false;
};

module.exports = {
    startCollect,
    stopCollect,
};