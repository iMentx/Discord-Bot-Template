const Discord = require("discord.js");
module.exports = {

run: async(client, message, args) => {


    message.delete();
    if (!message.member.hasPermission('ADMINISTRATOR')) return message.reply("O comando **!chdel** é restrito para membros com permissão de **administrador**").then(msg => msg.delete({timeout: 5000}))
    
      message.channel.delete()
  }
}