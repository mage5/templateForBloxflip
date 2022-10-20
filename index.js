require("dotenv").config();
const fs = require("fs");
const { Collection, Client, ActivityType } = require("discord.js");

const client = new Client({
    intents: 131071
  })
client.commands = new Collection();

//Loading Events
fs.readdir(__dirname + "/events/", (err, files) => {
  if (err) return console.error(err);
  files.forEach((file) => {
    const event = require(__dirname + `/events/${file}`);
    let eventName = file.split(".")[0];
    console.log(`Loaded EVENT: '${eventName}'`);
    client.on(eventName, event.bind(null, client));
  });
});

//Loading Commands
fs.readdir('./commands/', async (err, files) => {
	if (err) return console.error;
	files.forEach(file => {
		if (!file.endsWith('.js')) return;
		let props = require(`./commands/${file}`);
		let cmdName = file.split('.')[0];
		console.log(`Loaded COMMAND: '${cmdName}'`);
		client.commands.set(cmdName, props);
	});
});

client.login(process.env.token)