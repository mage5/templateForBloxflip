require("dotenv").config()
const { EmbedBuilder } = require('discord.js')

module.exports = {
    info: {
        name: "help",
        description: "To show all commands",
        usage: "[Command]",
        aliases: ["commands"]
    },

    run: async function(client, message, args){

const guildPrefix = '.'

        var allcmds = "";

        client.commands.forEach(cmd => {
            let cmdinfo = cmd.info
            allcmds+="``"+guildPrefix+cmdinfo.name+" "+cmdinfo.usage+"`` ~ "+cmdinfo.description+"\n"
        })

        message.reply('A DM has been sent to you!').catch(console.error)

        if(!args[0]) return message.author.send({ 
            embeds: [{
                author: {
                    name: `Commands of ${client.user.username}`,
                    icon_url: `${client.user.displayAvatarURL()}`
                },
                color: "BLUE",
                description: `${allcmds}`,
                footer: {
                    text: `To get info of each command you can do .help [command] | Join us in https://discord.gg/8bNJxBaKQm`
                }
            }] 
        }).catch(console.error)

            let cmd = args[0]
            let command = client.commands.get(cmd)
            if(!command)command = client.commands.find(x => x.info.aliases.includes(cmd))
            if(!command)return message.author.send("Unknown Command")
            let commandinfo = new EmbedBuilder()
            .setTitle("Command: "+command.info.name)
            .setColor("YELLOW")
            .setDescription(`
Name: ${command.info.name}
Description: ${command.info.description}
Usage: \`\`${guildPrefix}${command.info.name} ${command.info.usage}\`\`
Aliases: ${command.info.aliases.join(", ")}
`)
            message.author.send({ 
                embeds: [commandinfo]
             }).catch(console.error)
    }
}
