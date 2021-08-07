const Discord = require('discord.js');

exports.run = async(client, message, args) => {
    var list = [
        'https://i.4pcdn.org/pol/1569613656380.gif',
        'https://5efce21e120dc77e32455754.static-01.com/l/images/173baa0599bebdc6ce75b1baf96fd7d635f39804.gif'
        //PODE BOTAR MAIS LINKS 
    ];

    var rand = list[Math.floor(Math.random() * list.length)];
    let hack = message.mentions.users.first() || client.users.cache.get(args[0]);

    if (!hack) return message.channel.send(`<a:error:866355131754610738> ${message.author} Mencione Alguém Para hackear`)
    
    let hacked = new Discord.MessageEmbed()
    .setColor("#15FF00")
    .setTitle(`Hackeado`)
    .setDescription(`Muhahahaha ${hack} Hacked by: ${message.author}`)
    .setImage(rand)
    .setThumbnail(message.author.displayAvatarURL({ dinamyc: "true", format: "gif", size: 2048}))
    .setFooter(`Hacker: ${message.author.tag}`, message.author.displayAvatarURL({ dinamyc: "true", format: "gif", size: 2048}))
    .setTimestamp();
    //PODE MUDAR TODO O EMBED SE QUISER <3
    message.channel.send(hacked);

}