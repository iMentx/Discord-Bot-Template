const {
  MessageAttachment
} = require("discord.js")

const db = require('quick.db')
const write = require('write');

module.exports = {
  name: 'announcement',
  run: async (client, message, args) => {

    if(!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send(`${message.author}, você não tem permissão para usar este comando.`)
    if(!message.guild.me.hasPermission('MANAGE_GUILD')) return message.channel.send(`${message.author}, eu não tenho permissão para executar o comando neste servidor.`)

    const filter = m => m.author.id === message.author.id

    let embed = {
      "title": `${client.user.username} - Announcement Panel`,
      "description": `${message.author}, Este é o Painel de Anúncios. Aqui você pode criar um anúncio de forma fácil e prática.\n\nO canal para onde será enviado o anúncio ainda não foi definido.\nClique na reação 💬 para definir o chat.`,
      "type": "rich",
      "color": "#4B0082",
      "fields": [{
          name: 'Definitions',
          value: '**1️⃣ | Definir Título\n2️⃣ | Definir Descrição\n3️⃣ | Definir Cor**',
          inline: true
        },
        {
          name: '||\n||',
          value: '**4️⃣ | Definir Imagem\n5️⃣ | Definir miniatura\n6️⃣ | Definir menção**',
          inline: true
        },
        {
          name: 'Options',
          value: '📄 Envie uma prévia. | ✅ Envie o anúncio.',
          inline: false
        },
      ],
      "footer": {
        text: `Comando usado por: ${message.author.tag}`
      }
    }

    await message.channel.send({
      embed
    }).then(async msg => {

      await msg.react('💬');
      await msg.react('1️⃣');
      await msg.react('2️⃣');
      await msg.react('3️⃣');
      await msg.react('4️⃣');
      await msg.react('5️⃣');
      await msg.react('6️⃣');
      await msg.react('📄');
      await msg.react('✅');

      const filterChannel = (reaction, user) => reaction.emoji.name === '💬' && user.id === message.author.id;
      const filterTitle = (reaction, user) => reaction.emoji.name === '1️⃣' && user.id === message.author.id;
      const filterDescription = (reaction, user) => reaction.emoji.name === '2️⃣' && user.id === message.author.id;
      const filterColor = (reaction, user) => reaction.emoji.name === '3️⃣' && user.id === message.author.id;
      const filterImage = (reaction, user) => reaction.emoji.name === '4️⃣' && user.id === message.author.id;
      const filterThumbnail = (reaction, user) => reaction.emoji.name === '5️⃣' && user.id === message.author.id;
      const filterMention = (reaction, user) => reaction.emoji.name === '6️⃣' && user.id === message.author.id;
      const filterPreview = (reaction, user) => reaction.emoji.name === '📄' && user.id === message.author.id;
      const filterSend = (reaction, user) => reaction.emoji.name === '✅' && user.id === message.author.id;

      const collectorChannel = msg.createReactionCollector(filterChannel, {
        time: 60000 * 10
      });
      const collectorTitle = msg.createReactionCollector(filterTitle, {
        time: 60000 * 10
      });
      const collectorDescription = msg.createReactionCollector(filterDescription, {
        time: 60000 * 10
      });
      const collectorColor = msg.createReactionCollector(filterColor, {
        time: 60000 * 10
      });
      const collectorImage = msg.createReactionCollector(filterImage, {
        time: 60000 * 10
      });
      const collectorThumbnail = msg.createReactionCollector(filterThumbnail, {
        time: 60000 * 10
      });
      const collectorMention = msg.createReactionCollector(filterMention, {
        time: 60000 * 10
      });
      const collectorPreview = msg.createReactionCollector(filterPreview, {
        time: 60000 * 10
      });
      const collectorSend = msg.createReactionCollector(filterSend, {
        time: 60000 * 10
      });

      await collectorChannel.on('collect', async c => {
        await message.channel.send(`${message.author}, Mencione ou digite o id do bate-papo.`).then(async cMsg => {
          const channelCollector = message.channel.createMessageCollector(filter, {
              max: 1,
              time: 60000 * 10
            })
            .on('collect', async ch => {
              const channel = ch.mentions.channels.first() || message.guild.channels.cache.get(ch.content)

              if (channel === undefined) {
                cMsg.delete()
                ch.delete()
                c.users.remove(message.author)
                return message.channel.send(`${message.author}, the chat informed does not exist.`).then(chErroMsg => {
                  setTimeout(() => {
                    chErroMsg.delete()
                  }, 5000)
                });
              }

              let embedChannel = {
                "title": `${client.user.username} - Announcement Panel`,
                "description": `${message.author}, Este é o painel de anúncios. Aqui você pode criar um anúncio de forma fácil e prática.\n\nCanal de anúncio definido em <#${channel.id}>\nClique na reação 💬 para definir o canal.`,
                "type": "rich",
                "color": "#4B0082",
                "fields": [{
                    name: 'Definitions',
                    value: '**1️⃣ | Defina o Titúlo\n2️⃣ | Defina a Descrição\n3️⃣ | Defina a Cor**',
                    inline: true
                  },
                  {
                    name: '||\n||',
                    value: '**4️⃣ | Defina a Imagem\n5️⃣ | Defina a miniatura\n6️⃣ | Defina a Menção.**',
                    inline: true
                  },
                  {
                    name: 'Options',
                    value: '📄 Envie uma prévia. | ✅ Envie o anúncio.',
                    inline: false
                  },
                ],
                "footer": {
                  text: `Command used by: ${message.author.tag}`
                }
              }

              msg.edit({
                embed: embedChannel
              })

              cMsg.delete()
              ch.delete()

              await db.set(`channelanuncio_${message.guild.id}_${message.author.id}`, channel.id)
            })
        })
      });

      await collectorTitle.on('collect', async t => {
        await message.channel.send(`${message.author}, Insira o título do anúncio.`).then(async tMsg => {
          const titleCollector = message.channel.createMessageCollector(filter, {
              max: 1,
              time: 60000 * 10
            })
            .on('collect', async tt => {

              let titleC = tt.content

              tMsg.delete()
              tt.delete()

              await db.set(`titleanuncio_${message.guild.id}_${message.author.id}`, titleC)
            })
        })
      });

      await collectorDescription.on('collect', async d => {
        await message.channel.send(`${message.author}, Insira a descrição do anúncio.`).then(async dMsg => {
          const descCollector = message.channel.createMessageCollector(filter, {
              max: 1,
              time: 60000 * 10
            })
            .on('collect', async desc => {

              let descC = desc.content

              dMsg.delete()
              desc.delete()

              await db.set(`descriptionanuncio_${message.guild.id}_${message.author.id}`, descC)
            })
        })
      });

      await collectorColor.on('collect', async cor => {

        const embedColor = {
          "title": `${client.user.username} - Color Center`,
          "description": `${message.author}, Escolha uma cor para você usar em seu anúncio.\nAbaixo estão algumas cores hexadecimais que você pode usar.\n\n**Red - \`#FF0000\`\nYellow - \`#FFFF00\`\nBlue - \`#0000FF\`\nGreen - \`#008000\`\nPurple - \`#4B0082\`\nBlack - \`#000005\`**\n\nClique **[Aqui](https://celke.com.br/artigo/tabela-de-cores-html-nome-hexadecimal-rgb)** e veja mais.`,
          "type": "rich",
          "color": "#4B0082",
          "footer": {
            text: "⚠️ A cor deve ser em hexadecimal e conter um '#' na frente."
          }
        }

        message.channel.send({
          embed: embedColor
        }).then(clMsg => {
          const colorCollector = message.channel.createMessageCollector(filter, {
              max: 1,
              time: 60000 * 5
            })
            .on('collect', async colors => {

              let colorC = colors.content

              clMsg.delete()
              colors.delete()

              await db.set(`coloranuncio_${message.guild.id}_${message.author.id}`, colorC)
            })
        })

      });

      await collectorImage.on('collect', async i => {
        await message.channel.send(`${message.author}, Anexe a imagem **(imagem grande)** que será usada no anúncio.`).then(iMsg => {
          const imageCollector = message.channel.createMessageCollector(filter, {
            max: 1,
            time: 60000 * 3
          })
          .on('collect', async img => {
            if(img.attachments.size > 0) {
              img.delete()
              iMsg.delete()
              await db.set(`imageanuncio_${message.guild.id}_${message.author.id}`, img.attachments.map(imgg => imgg.attachment).toString())
            } else {
              await message.channel.send(`${message.author}, this file is not an image.`).then(delImg => {
                setTimeout(() => {
                  img.delete()
                  iMsg.delete()
                  i.users.remove(message.author.id)
                  delImg.delete()
                }, 5000)
              })
            }
          })
        })
      })

      await collectorThumbnail.on('collect', async th => {
        await message.channel.send(`${message.author}, Anexe a imagem que será usada na miniatura**(Imagem pequena)** do anúncio.`).then(thMsg => {
          const thumbnailCollector = message.channel.createMessageCollector(filter, {
            max: 1,
            time: 60000 * 3
          })
          .on('collect', async thumb => {
            if(thumb.attachments.size > 0) {
              thumb.delete()
              thMsg.delete()
              await db.set(`thumbnailanuncio_${message.guild.id}_${message.author.id}`, thumb.attachments.map(thm => thm.attachment).toString())
            } else {
              await message.channel.send(`${message.author}, this file is not an image.`).then(delThm => {
                setTimeout(() => {
                  thumb.delete()
                  thMsg.delete()
                  th.users.remove(message.author.id)
                  delThm.delete()
                }, 5000)
              })
            }
          })
        })
      })

      await collectorMention.on('collect', async m => {

        const embedMention = {
          "title": `${client.user.username} - Mention Center`,
          "description": `**1️⃣ | Mencionar @everyone\n2️⃣ | Mencionar outro cargo.\n3️⃣ | Não mencione nada.**`,
          "type": "rich",
          "color": "#4B0082",
        }

        await message.channel.send({ embed: embedMention }).then(async mMsg => {

          await mMsg.react('1️⃣')
          await mMsg.react('2️⃣')
          await mMsg.react('3️⃣')

          const everyoneFilter = (reaction, user) => reaction.emoji.name === '1️⃣' && user.id === message.author.id
          const outrosFilter = (reaction, user) => reaction.emoji.name === '2️⃣' && user.id === message.author.id
          const nenhumFilter = (reaction, user) => reaction.emoji.name === '3️⃣' && user.id === message.author.id

          const collectorEveryone = mMsg.createReactionCollector(everyoneFilter, { max: 1, time: 60000 * 3 });
          const collectorOutros = mMsg.createReactionCollector(outrosFilter, { max: 1, time: 60000 * 3 });
          const collectorNenhum = mMsg.createReactionCollector(nenhumFilter, { max: 1, time: 60000 * 3 });

          await collectorEveryone.on('collect', async e => {
            mMsg.delete()

            message.channel.send(`${message.author}, Menção definida como **\`@everyone\`**.`).then(delEve => {
              setTimeout(() => {
                delEve.delete()
              }, 5000)
            })
            await db.set(`mentionanuncio_${message.guild.id}_${message.author.id}`, '@everyone')
          })

          await collectorOutros.on('collect', async o => {
            mMsg.delete()
            await message.channel.send(`${message.author}, Mencione ou forneça o ID do cargo a ser mencionado.`).then(async oMsg => {
              const roleCollector = message.channel.createMessageCollector(filter, { max: 1, time: 60000 })
              .on('collect', async r => {
                const role = r.mentions.roles.first() || message.guild.roles.cache.get(r.content)

                if(role === undefined) {
                  o.users.remove(message.author.id)
                  r.delete()
                  oMsg.delete()
                  return message.channel.send(`${message.author}, this role does not exist`).then(err => {
                    setTimeout(() => {
                      err.delete()
                    }, 5000)
                  })
                }

                r.delete()
                oMsg.delete()
                await db.set(`mentionanuncio_${message.guild.id}_${message.author.id}`, role.id)
              })
            })
          })

          await collectorNenhum.on('collect', async n => {
            mMsg.delete()
            await db.set(`mentionanuncio_${message.guild.id}_${message.author.id}`, null)
            message.channel.send(`${message.author}, Nenhum cargo será mencionado.`).then(delN => {
              setTimeout(() => {
                delN.delete()
              }, 5000)
            })
          })

          setTimeout(() => {
            m.users.remove(message.author.id)
            mMsg.delete()
          }, 60000 * 5)

        })

      })

      await collectorPreview.on('collect', async p => {

        let mentions = await db.get(`mentionanuncio_${message.guild.id}_${message.author.id}`)
        let title = await db.get(`titleanuncio_${message.guild.id}_${message.author.id}`)
        let description = await db.get(`descriptionanuncio_${message.guild.id}_${message.author.id}`)
        let image = await db.get(`imageanuncio_${message.guild.id}_${message.author.id}`)
        let thumbnail = await db.get(`thumbnailanuncio_${message.guild.id}_${message.author.id}`)
        let color = await db.get(`coloranuncio_${message.guild.id}_${message.author.id}`)

        const mention = mentions === '@everyone' ? mentions : message.guild.roles.cache.get(mentions)

        const previewEmbed = {
          "title": `${title || ' '}`,
          "description": `${description || ' '}`,
          "image": { 
            "url": `${image || ''}`,
            "width": 1280,
            "height": 720
          },
          "thumbnail": {
            "url": `${thumbnail || ''}`,
            "width": 512,
            "height": 512
          },
          "color": `${color || '#4B0082'}`,
          "footer": {
            text: `A visualização será excluída em 1 minuto`,
          }
        }

        message.channel.send(`${mention === "@everyone" ? "`@everyone`" : `${mention === undefined ? '' : '`@' +mention.name+ '`'}`}`, { embed: previewEmbed }).then(delMsg => {
          setTimeout(() => {
            delMsg.delete()
          }, 60000)
        })

      })

      await collectorSend.on('collect', async s => {

        let channel = await db.get(`channelanuncio_${message.guild.id}_${message.author.id}`)
        let mentions = await db.get(`mentionanuncio_${message.guild.id}_${message.author.id}`)
        let title = await db.get(`titleanuncio_${message.guild.id}_${message.author.id}`)
        let description = await db.get(`descriptionanuncio_${message.guild.id}_${message.author.id}`)
        let image = await db.get(`imageanuncio_${message.guild.id}_${message.author.id}`)
        let thumbnail = await db.get(`thumbnailanuncio_${message.guild.id}_${message.author.id}`)
        let color = await db.get(`coloranuncio_${message.guild.id}_${message.author.id}`)

        if (!channel) {
          s.users.remove(message.author.id)
          return message.channel.send(`${message.author}, você ainda não configurou o chat para enviar o anúncio.`).then(delMsg => {
            setTimeout(() => {
              delMsg.delete()
            }, 5000)
          });
        }

        const txt = `Title: ${title || `undefined`}\n\nDescription: ${description || `undefined`}\n\nColor: ${color || `undefined`}\n\nImage: ${image || `undefined`}\n\nThumbnail: ${thumbnail || `undefined`}`

        const sendEmbed = {
          "title": `${title || ' '}`,
          "description": `${description || ' '}`,
          "image": { 
            "url": `${image || ''}`,
            "width": 1280,
            "height": 720
          },
          "thumbnail": {
            "url": `${thumbnail || ''}`,
            "width": 512,
            "height": 512
          },
          "color": `${color || '#4B0082'}`,
          "footer": {
            text: `Embed enviado por ${message.author.tag}`,
            icon_url: `${message.author.displayAvatarURL({ dynamic: true, size: 512 })}`
          }
        }

        message.delete()
        msg.delete()

        const mention = mentions === '@everyone' ? "@everyone" : message.guild.roles.cache.get(mentions)

        await client.channels.cache.get(channel).send(mention || '', {
          embed: sendEmbed
        }).then(async msgs => {
          write.sync(`ad.txt`, txt, {
            newline: true
          })

          await message.channel.send(`${message.author}, Copia **\`.txt\`** do seu anuncio.`, new MessageAttachment('ad.txt', `ad_${msgs.id}.txt`))
        }).catch((err) => console.log(err))

        var del = require('delete');
        del.sync(['ad.txt'])
        db.delete(`channelanuncio_${message.guild.id}_${message.author.id}`)
        db.delete(`mentionanuncio_${message.guild.id}_${message.author.id}`)
        db.delete(`titleanuncio_${message.guild.id}_${message.author.id}`)
        db.delete(`descriptionanuncio_${message.guild.id}_${message.author.id}`)
        db.delete(`imageanuncio_${message.guild.id}_${message.author.id}`)
        db.delete(`thumbnailanuncio_${message.guild.id}_${message.author.id}`)
        db.delete(`coloranuncio_${message.guild.id}_${message.author.id}`)
      });

      setTimeout(async () => {
        msg.delete()
        message.delete()

        db.delete(`channelanuncio_${message.guild.id}_${message.author.id}`)
        db.delete(`mentionanuncio_${message.guild.id}_${message.author.id}`)
        db.delete(`titleanuncio_${message.guild.id}_${message.author.id}`)
        db.delete(`descriptionanuncio_${message.guild.id}_${message.author.id}`)
        db.delete(`imageanuncio_${message.guild.id}_${message.author.id}`)
        db.delete(`thumbnailanuncio_${message.guild.id}_${message.author.id}`)
        db.delete(`coloranuncio_${message.guild.id}_${message.author.id}`)
      }, 60000 * 10)

    })
  }
}
