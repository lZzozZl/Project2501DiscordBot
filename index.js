// Loading Discord library and token
const Discord = require('discord.js');
const botconfig = require('./botconfig.json');
const bot = new Discord.Client({disableEveryone: true});

// Running code
bot.on('ready', async () => {    
    console.log(`${bot.user.username} is online!`);
    console.log('The net is vast and infinite!');
    bot.user.setActivity('with source code', { type: "PLAYING" });
});

bot.on('message', async message => {
    if (message.author.bot) return;
    if (message.channel.type === 'dm') console.log(`${message.createdAt} ${message.author.username}:  ${message.content}`);
    
    // Get message/command split message to args and save them to array
    let prefix = botconfig.prefix;
    let messageArray = message.content.split(' ');
    let cmd = messageArray[0];
    let args = messageArray.slice(1);

    if (cmd === `${prefix}hi`){
        console.log('calling hi');
        return message.channel.send('Hello');
    }

    // Bot info and stuff
    if (cmd === `${prefix}botinfo`){
        
    }

});

bot.login(botconfig.token);

