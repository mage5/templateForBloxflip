require("dotenv").config()

module.exports = async (client, message) => {

  if (message.author.bot) return;

  const prefixMention = new RegExp(`^<@!?${client.user.id}> `);

  const prefix = message.content.match(prefixMention) ? message.content.match(prefixMention)[0] : '.';

  //To change the prefix change the '.' in [message.content.match(prefixMention)[0] : '.'] to what you desire
  
  if (message.content.indexOf(prefix) !== 0) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/g);

  const command = args.shift().toLowerCase();

  const cmd = client.commands.get(command);

  const aliases = client.commands.find(x => x.info.aliases.includes(command))

  if(message.channel.type === "dm")return message.channel.send("None of the commands work in DMs. So please use commands in server!")

  if(cmd){
    cmd.run(client, message, args);
  }else if(aliases){
    aliases.run(client, message, args);
  }else return
};
