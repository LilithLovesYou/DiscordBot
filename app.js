const { CommandoClient } = require('discord.js-commando');
const path = require('path');
const fs = require('fs');
const { token } = require('./auth.json');
const { prefix, ownerID, supportServer } = require('./config.json');

// Create the bot variable 
const client = new CommandoClient({
	commandPrefix: prefix,
	owner: ownerID,
	invite: supportServer
});

// Register the client
client.registry
	.registerDefaultTypes()
	.registerGroups([
		['group1', 'description1'],
		['group2', 'description2'],
		['group3', 'description3'],
	])
	.registerDefaultGroups()
	.registerDefaultCommands({
		unknownCommand: false,
		help: false
	})
	.registerCommandsIn(path.join(__dirname, 'commands'));

// Event handler
fs.readdir("./events/", (err, files) => {
	if (err) return console.error(err);
	files.forEach(file => {
		const event = require(`./events/${file}`);
		   eventName = file.split(".")[0];
		client.on(eventName, event.bind(null, client));
    });
});

// Log error
client.on('error', console.error);

// Login to the client
client.login(token);
