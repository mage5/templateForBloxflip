const { Collection, Client, ActivityType } = require("discord.js");

module.exports = async (client) => {
    console.log(`[API] Logged in as ${client.user.username}`);
    client.user.setActivity(`${client.guilds.cache.size} Guilds with ${client.users.cache.size} Users`, { type: ActivityType.Watching })
  };