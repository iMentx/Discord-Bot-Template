const Discord = require('discord.js');

module.exports = {

    'name': 'corno',
    'description': 'mostra se vc ou alguem que vc mencionar e um corno ou nao.'


    ,run: async (client, message, args) => {

    let corno = Math.round(Math.random() * 100)
        let pessoa = message.mentions.users.first() || message.author;
        if(!pessoa) return message.channel.send("❌|${message.author}, Mencione uma pessoa para ver se é corno ou não")

        let saber
    if(corno > 80) {
      corno = ("é 80% corno...");
    } else if(corno>= 40) {
      corno = ("é 40% corno"); 
    } else if(corno>= 10){
      corno = ("é 10% corno")
    } else {
      corno = ("É 100% corno"); 
    }
    let embedin = new Discord.MessageEmbed()
    .setTitle('Corno?')
    .setDescription(`🐂| ${pessoa} ${corno}`)
    .setColor('RAMDOM')

    message.channel.send(`${message.author}`, embedin)


}} 