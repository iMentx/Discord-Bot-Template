const Discord = require('discord.js');

module.exports = {

    'name': 'gay',
    'description': 'mostra se vc ou alguem que vc mencionar e um gay ou nao.'


    ,run: async (client, message, args) => {

    let gay = Math.round(Math.random() * 100)
        let pessoa = message.mentions.users.first() || message.author;
        if(!pessoa) return message.channel.send("❌|${message.author}, Mencione uma pessoa para ver se é gay ou não")

        let frase
    if(gay > 80) {
      gay = ("é 80% gay...");
    } else if(gay>= 40) {
      gay = ("é 40% gay"); 
    } else if(gay>= 10){
      gay = ("é 10% gay")
    } else {
      gay = ("É 100% gay"); 
    }
    let embedin = new Discord.MessageEmbed()
    .setTitle('Gay!?')
    .setDescription(`🙀| ${pessoa} ${gay}`)
    .setColor('RAMDOM')

    message.channel.send(`${message.author}`, embedin)


}}