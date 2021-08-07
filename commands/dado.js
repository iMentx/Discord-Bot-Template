const Discord = require('discord.js');

exports.run = async(client, message, args) => {
 let dado = [`1`, `2`, `3`, `4`, `5`, `6`]
 let roll = dado[Math.floor(Math.random() * dado.length)];

message.channel.send(`seu dado de 6 lados caiu no número:** ${roll} **!`)
}