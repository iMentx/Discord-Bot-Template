const Discord = require('discord.js');
const disbut = require('discord-buttons');
const { MessageActionRow, MessageButton } = require("discord-buttons");

module.exports = {
  name: "help",
   aliases: ["hlp"],
  run: async (client, message, args ) => {
      //--------------------------------------S T A R T---------------------------------------

    //--------------------EMBEDS------------------------

    const embed = new Discord.MessageEmbed()
    .setDescription(`Click the buttons below to click the help menu!`);

    const embed1 = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setDescription(`Basic Commands!`);

    const embed2 = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setDescription(`Random Commands!`);

    const embed3 = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setDescription(`[ Role Lock ] Commands`);

    const embed4 = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setDescription(`Admin Commands`);

    //--------------------EMBEDS------------------------

    //--------------------Buttons------------------------

    let button1 = new MessageButton()
    .setLabel(`Basic Commands`)
    .setID(`help1`)
    .setEmoji(`🎈`)
    .setStyle("green");

    let button2 = new MessageButton()
    .setLabel(`Random Commands`)
    .setID(`help2`)
    .setEmoji(`🎭`)
    .setStyle("green");

    let button3 = new MessageButton()
    .setLabel(`[ Role Lock ] Commands`)
    .setID(`help3`)
    .setEmoji(`🔐`)
    .setStyle("green");
    if(!message.member.roles.cache.has("872754954576752661")) button3.setDisabled(true);//coloca o id do cargo do adm 


    let button4 = new MessageButton()
    .setLabel(`Admin Commands`)
    .setID(`help4`)
    .setEmoji(`⚙`)
    .setStyle("green");
    if(!message.member.hasPermission("ADMINISTRATOR")) button4.setDisabled(true);

    let row = new MessageActionRow()
    .addComponents(button1, button2, button3, button4);

    //--------------------Buttons------------------------

    const MESSAGE = await message.channel.send(embed, row);

    const filter = ( button ) => button.clicker.user.id === message.author.id 
    const collector = MESSAGE.createButtonCollector(filter, { time : 120000 });

    collector.on('collect', async (b) => {

        if(b.id == "help1") {

            MESSAGE.edit(embed1, row);
            await b.reply.defer()

        }

        if(b.id == "help2") {
            
            MESSAGE.edit(embed2, row);
            await b.reply.defer()

        }

        if(b.id == "help3") {
            
            MESSAGE.edit(embed3, row);
            await b.reply.defer()

        }

        if(b.id == "help4") {
            
            MESSAGE.edit(embed4, row);
            await b.reply.defer()

        }


    })

    collector.on('end', (b) => {
        MESSAGE.edit(`This help menu is expired! Type the command again to view.`)
    })

       
    }
  };