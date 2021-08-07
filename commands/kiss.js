const Discord = require("discord.js");
//———————————————————————————————————————————————————————————————————————————————————//
module.exports = {
run: async (client, message, args) => {
//———————————————————————————————————————————————————————————————————————————————————//
const user = message.mentions.users.first() || message.guild.members.cache.get(args[0])
if (!user) return message.reply("Você precisa mencionar alguém para beijar");
//———————————————————————————————————————————————————————————————————————————————————//
var list = [
    ``,
    ``,
    ``,
    ``,
    ``,
    ``,
    ``
];
var rand = list[Math.floor(Math.random() * list.length)];
//———————————————————————————————————————————————————————————————————————————————————//
        //deletar a solicitação!
        message.delete().catch(O_o => {});

        let beijador = message.author
        let beijado = user

const embed = new Discord.MessageEmbed()
.setTitle(`💖 O amor esta no ar! 💖`)
.setDescription(`
${beijador} beijou ${beijado}
—————————————————————
- Reaja:
💞 Para retribuir
💢 Para recusar`)
.setFooter(``)
.setTimestamp()
.setColor(`RANDOM`)
//————————————————————————————————————————————————//
const embed2 = new Discord.MessageEmbed()
.setTitle(`💗 ${beijado} retribuiu 💗`)
.setDescription(`
${beijado} retribuiu o beijo do(a) ${beijador}`)
.setFooter(``)
.setTimestamp()
.setColor(`RANDOM`)
//————————————————————————————————————————————————//
const embed3 = new Discord.MessageEmbed()
.setTitle(`💥 ${beijado} recusou 💥`)
.setDescription(`
${beijado} recusou o beijo do(a) ${beijador} `)
.setFooter(``)
.setTimestamp()
.setColor(`RANDOM`)
//———————————————————————————————————————————————————————————————————————————————————//
await message.channel.send(beijado, embed).then(msg => {
    msg.react('💞')
    msg.react('💢')
    msg.awaitReactions((reaction, user) => {    
       if (message.mentions.users.first().id !== user.id) return

        if (reaction.emoji.name === '💞') {
          return message.channel.send(beijador, embed2)
        }
        if (reaction.emoji.name === '💢') {
          return message.channel.send(beijador, embed3)
        }
//———————————————————————————————————————————————————————————————————————————————————//
})
})
}}