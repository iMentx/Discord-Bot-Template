const Discord = require("discord.js"); 
const client = new Discord.Client(); 
const config = require("./config.json");
const { hangman, timeout } = require('reconlx'); 

client.queue = new Map();

client.login(config.token); 

client.on('message', message => {
     if (message.author.bot) return;
     if (message.channel.type == 'dm') return;
     if (!message.content.toLowerCase().startsWith(config.prefix.toLowerCase())) return;
     if (message.content.startsWith(`<@!${client.user.id}>`) || message.content.startsWith(`<@${client.user.id}>`)) return;

    const args = message.content
        .trim().slice(config.prefix.length)
        .split(/ +/g);
    const command = args.shift().toLowerCase();

    try {
        const commandFile = require(`./commands/${command}.js`)
        commandFile.run(client, message, args);
    } catch (err) {
    console.error('Erro:' + err); 
  }
});

client.on("ready", () => {
  let activities = [
      `Utilize ${config.prefix}help para obter ajuda`,
      `👑 ${client.user.username} Sempre lhe ajudando`,
      `🔰 Sempre online! `,
      `🐱‍👤 iMentx ™ `
    ],
    i = 0;
  setInterval( () => client.user.setActivity(`${activities[i++ % activities.length]}`, {
        type: "STREAMING",
        url: "https://twitch.tv/imentx"
      }), 1000 * 60); 
  client.user
      .setStatus("dnd")
     .catch(console.error);
console.log(`${client.user.username} está pronto pronta para trabalhar e ajudar pessoas!`)
});

client.on("message", message => {
  if (message.author.bot) return;
  if (message.channel.type == 'Rikka')
  return
  if(message.content == `<@${client.user.id}>` || message.content == `<@!${client.user.id}>`) {
  return message.channel.send(`🏆 | **Olá ${message.author}**, **veja meus comandos com** **${config.prefix}help**!`)
  }
  }); 


  client.on("ready", () => {

    const embed = new Discord.MessageEmbed()
    .setTitle(`B.O.T online`) //titulo
    .setDescription(`A ${client.user.username} foi iniciada com sucesso. Divirta-se ao máximo com a ${client.user.username}`) //descrição
    .setColor(`#663399`) //cor
    .setThumbnail(`https://cdn.discordapp.com/attachments/805889873805443082/873131207246893056/YFP-d-yr.jpg`) //imagem do canto
    .setFooter(`Online`) //texto que fica embaixo
    var channel = client.guilds.cache
      .get("870651850406383647") // Id do Servidor
      .channels.cache.get("872869661216215120"); //Id do canal onde a mensagem será enviada
    setInterval(function() {
      channel.send(embed); 
    }, 1000 * 60 * 60 * 1); //tempo (ele ja ta cronometrado pra enviar quando ligar)
    channel.send(embed);
    console.log("Mensagem de boas-vindas enviada com  sucesso no canal #logs")
  })

  client.on("ready", () => {
    console.log("Descarregado em `https://github.com/iMentx/RikkaBot.git`")
  })


//  client.on("ready", () => {

//    const embed2 = new Discord.MessageEmbed()
//    .setTitle(`B.O.T online`) //titulo
//    .setDescription(`A ${client.user.username} foi iniciada com sucesso. Divirta-se ao máximo com a ${client.user.username}`) //descrição
//    .setColor(`#663399`) //cor da embed
//    .setFooter(`Online`) //texto que fica embaixo
//    .setThumbnail(`https://cdn.discordapp.com/attachments/805889873805443082/873131207246893056/YFP-d-yr.jpg`) //foto no canto superior direito
//    var channel = client.guilds.cache
//      .get("870651850406383647") // Id do Servidor
//      .channels.cache.get("872869661216215120"); //Id do canal onde a mensagem será enviada
//    setInterval(function() {
//      channel.send(embed2); 
//    }, 5000); //tempo de intervalo (lembrando que 1000ms é 1 segundo)
//    console.log("Mensagem cronometrada enviada com sucesso!")
//  })
    