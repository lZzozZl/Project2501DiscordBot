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
    
    // Getting prefix symbol from botconfig.json dictionary
    // And saving it into variable
    let prefix = botconfig.prefix;

    // Get message/command split message 
    // to args and save them to array
    let messageArray = message.content.split(' ');
    let cmd = messageArray[0];
    let args = messageArray.slice(1);

    // Replying on simple command
    if (cmd === `${prefix}hi`){
        console.log('calling hi');
        return message.channel.send('Hello');
    }

    // Bot info and server info using
    // Embed format on discord library
    if (cmd === `${prefix}botinfo`){        
        let bicon = bot.user.displayAvatarURL;
        let botembed = new Discord.RichEmbed()
        .setDescription('Bot information')
        .setColor('#15f153')
        .setThumbnail(bicon)
        .addField('Bot Name', bot.user.username)
        .addField('Created on', bot.user.createdAt);
        
        return message.channel.send(botembed);
    }

    if (cmd === `${prefix}serverinfo`){
        let sicon = message.guild.iconURL;
        let serverembed = new Discord.RichEmbed()
        .setDescription('Server information')
        .setColor('#15f153')
        .setThumbnail(sicon)
        .addField('Server Name', message.guild.name)
        .addField('Created on', message.guild.createdAt)
        .addField('You Joined at', message.member.joinedAt)
        .addField('Total members', message.guild.memberCount);

        return message.channel.send(serverembed);
    }

});

bot.login(botconfig.token);