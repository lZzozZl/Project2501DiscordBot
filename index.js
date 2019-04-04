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


    // Report command
    if (cmd === `${prefix}report`) {
        let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        if (!rUser) return message.channel.send('Couln\'t find user.');
        let reason = args.join(' ').slice(22);
        if (reason.length > 700)    // If report message is more than 700 symbols. This is because if goes more than 1024 it crashes
            return message.delete().catch(O_o=>{}), // Deletes the message from channel
            console.log(reason.length, 'Reason lenght'), // Send on console the lenght of the report message
            message.author.send('Kopele ko prai6?'); // Send private message the user who reporting, he is writing big message

        let reportEmbed = new Discord.RichEmbed()
        .setDescription('Reports')
        .setColor('#15f153')
        .addField('Reported User', `${rUser} with ID ${rUser.id}`)
        .addField('Reported by:', `${message.author} with ID: ${message.author.id}`)
        .addField('Channel', message.channel)
        .addField('Time', message.createdAt)
        .addField('Reason:', reason);

        let reportsChannel = message.guild.channels.find(x => x.name === 'reports');
        if (!reportsChannel) return message.channel.send('Couldn\'t find reports channel');
        
        message.delete().catch(O_o=>{});
        reportsChannel.send(reportEmbed);
        return;
    }


});

bot.login(botconfig.token);