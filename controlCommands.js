const Discord = require('discord.js');
const counter = require('./count');
const helpMenu = require('./helpMenu');


// Command router
let controlCommand = function (message) {
    if (message.content === '.help') {
        message.channel.send('yo');
        message.channel.send(counter(['shaun', 'crystal', 'rul']));
    };

    if (message.content === '..help') {
        message.channel.send('yo ho ho');
        message.channel.send(helpMenu());
    };

};

module.exports = controlCommand;
