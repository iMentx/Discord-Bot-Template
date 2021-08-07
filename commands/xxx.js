const Discord = require('discord.js');

module.exports = {
name: "xxx",
description: "Atualizar o canal para +18",
category: "Administração",
aliases: ["+18","nsf"],
 
  run: async (client, message, args) => {


if(!message.member.hasPermission("MANAGE_CHANNELS")) return message.reply( new Discord.MessageEmbed()
.setDescription("Você não pode atualizar esse canal.\n\n **A permissão necessária é \`\`\`MANAGE_CHANNELS\`\`\`**")
.setColor('RANDOM')
.setTimestamp(new Date())
.setFooter(`${message.author.username}`, message.author.displayAvatarURL({dynamic: true}))
)

        message.channel.setNSFW(true, "***CANAL ATUALIZADO!***")

  }
} //by imentx