const Discord = require("discord.js");

module.exports = {
        run: async(client, message, args) => { //embed do painel inicial


            const emoji1 = "⏮️";
            const emoji2 = "◀️";
            const emoji3 = "⏹️";
            const emoji4 = "▶️";
            const emoji5 = "⏭️";


            let embed = new Discord.MessageEmbed()
                .setTitle(`Central de comandos`)
                .setThumbnail(message.author.displayAvatarURL())
                .setDescription(`Central de comandos
                
                ⏮️ Ir para primeira pagina
                ◀️ Ir para pagina anterior
                ⏹️ Remover todas as reações
                ▶️ Ir para proxima pagina
                ⏭️ Ir para ultima pagina
                 `)
                .setFooter(`${message.author.tag}`)
                .setColor("YELLOW")



            message.channel.send(`${message.author}`, embed).then(msg => {

                msg.react(emoji1);
                msg.react(emoji2);
                msg.react(emoji3);
                msg.react(emoji4);
                msg.react(emoji5);

                let page = 0;

                client.on('messageReactionAdd', async(reaction, user) => {
                    const emoji1 = "⏮️";
                    const emoji2 = "◀️";
                    const emoji3 = "⏹️";
                    const emoji4 = "▶️";
                    const emoji5 = "⏭️";
                    if (user.partial) await user.fetch();
                    if (reaction.partial) await reaction.fetch();
                    if (reaction.message.partial) await reaction.message.fetch();

                    if (user.bot) return;

                    if (reaction.emoji.name == emoji1) {
                        reaction.users.remove(user);
                        page == 0;
                        if (page == 0) {
                            let embed = new Discord.MessageEmbed()
                                .setTitle(`Painel de comandos`)
                                .setThumbnail(message.author.displayAvatarURL())
                                .setDescription(`Veja meus comandos: ~
                                !8ball    !atacar

                                !autorule !avatar
              \nIr para primeira pagina
              ⠀`)
                                .setFooter(`${message.author.tag}`)
                                .setColor("YELLOW")
                            msg.edit(embed);
                        }
                    }
                    if (reaction.emoji.name == emoji2) {
                        reaction.users.remove(user);
                        page--;
                        if (page == 1) {
                            let embed = new Discord.MessageEmbed()
                                .setTitle(`Painel de comandos`)
                                .setThumbnail(message.author.displayAvatarURL())
                                .setDescription(`Veja meus comandos:
                                !jogodaforca  !dance

                                !chdel        !ticket
            \nIr para pagina anterior 1
            ⠀`)
                                .setFooter(`${message.author.tag}`)
                                .setColor("YELLOW")
                            msg.edit(embed);
                        }
                        if (page == 2) {
                            let embed = new Discord.MessageEmbed()
                                .setTitle(`Painel de comandos`)
                                .setThumbnail(message.author.displayAvatarURL())
                                .setDescription(`Veja meus comandos:
                                !play     !say

                                !ship     !xxx
                                \nIr para pagina anterior 2
            ⠀`)
                                .setFooter(`${message.author.tag}`)
                                .setColor("YELLOW")
                            msg.edit(embed);
                        }
                    }
                    if (reaction.emoji.name == emoji3) {
                        reaction.users.remove(user);
                    }
                    if (reaction.emoji.name == emoji4) {
                        reaction.users.remove(user);
                        page++;
                        if (page == 1) {
                            let embed = new Discord.MessageEmbed()
                                .setTitle(`Painel de comandos`)
                                .setThumbnail(message.author.displayAvatarURL())
                                .setDescription(`Veja meus comandos:
                                !bolsonaro   !clear
                                
                                !clima       !coinflip
            \nIr para proxima pagina 1
            ⠀`)
                                .setFooter(`${message.author.tag}`)
                                .setColor("YELLOW")
                            msg.edit(embed)
                        }
                        if (page == 2) {
                            let embed = new Discord.MessageEmbed()
                                .setTitle(`Painel de comandos`)
                                .setThumbnail(message.author.displayAvatarURL())
                                .setDescription(`Veja meus comandos:
                                !hacker   !dado

                                !hug      !kiss
                                \nIr para proxima pagina 2
            ⠀`)
                                .setFooter(`${message.author.tag}`)
                                .setColor("YELLOW")
                            msg.edit(embed);
                        }
                    }
                    if (reaction.emoji.name == emoji5) {
                        reaction.users.remove(user);
                        page = 2; //ultima pagina
                        if (page == 2) {
                            let embed = new Discord.MessageEmbed()
                                .setTitle(`Painel de comandos`)
                                .setThumbnail(message.author.displayAvatarURL())
                                .setDescription(`Veja meus comandos:
                                !corno    !gay
                                
                                !meme     !ping
            \nIr para ultima pagina
            ⠀`)
                                .setFooter(`${message.author.tag}`)
                                .setColor("YELLOW")
                            msg.edit(embed);
                        }
                    }


                });

            })

        }
    } //Comando em beta