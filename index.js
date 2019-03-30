// Loading Discord library and token
const Discord = require('discord.js');

// Loading custom modules
const controlCommand = require('./controlCommands');

// Running code
const client = new Discord.Client();
client.on('ready', () => {

    console.log('The net is vast and infinite!');
    client.channels.find(x => x.name === 'gladoscli').send('Follow your ghost |');
    // console.log(client.channels); 
    // console.log(client.guilds);  //returns object/s with 
    client.guilds.forEach((guild) => {
        console.log(" - " + guild.name);
    });

    // Bot status message
    client.user.setActivity(
        // 'The Cake is a lie!'
        'YOU', { type: "WATCHING" }
    );
});

client.on('message', message => {
    controlCommand(message);
});




client.login(token);

