'use strict'

const log = async message => {
    const log = await message.content;
    console.log(log);
};

module.exports = {
    log,
};