# Discord Bot

É um simples discord bot que ajuda o teu servidor com comandos muito bons como comandos de Administração.

Se tiveres  dúvidas sobre o bot contacte a 🐱‍👤 iMentx ™

## Tabela de conteúdo


* [Requisitos](#requisitos)
* [Começando](#começando)
* [Erros comuns](#erros-comuns)
* [Contribuindo](#contribuindo)
* [Autor](#autor)
* [Licensa](#licensa)

## Requisitos

- [Node](https://nodejs.org/en/) // Instale clicando no link afixado
- [NPM](https://www.npmjs.com/) // Já deve vir com a máquina 
- [discord.js](No terminal escreva - "npm i discord.js") // Este requisito é obrigatória para o bot funcionar em condições

## Começando

Primeiro, certifique-se de ter todas as ferramentas necessárias instaladas em sua máquina local e, em seguida, continue com essas etapas.

### Instalação

```bash
# Clone the repository
git clone https://github.com/iMentx/bot.git

# Enter into the directory
cd discord-bot/

# Install the dependencies
npm install
```

### Configuration

After cloning the project and installing all dependencies, you need to add your Discord API token in the config.json file.

### Starting the application

```bash
node index.js
```

### Starting the application using Docker

```bash
# Build the image
docker build --tag discordbot .

# Run the image
docker run -d discordbot
```

## Futuros & Comandos

> Note: O comando padrão é '!'


* 📃 Comando para testar códigos - Para ADMINISTRAÇÃO

`!eval`

* 🎓 Um jogo chamado "morse" - Para TODOS

`!morse`

* 💿 Comando para sugerir um ideia - Para TODOS

`!setsugerir`


* Now Playing (!nowplaying)
* Get information about a user (!userinfo)
* Ban a player (!ban)
* Delete the latest chat messages (!pruge)


## Erros comuns

Por enquanto não houve erros cometidos por usuários.

## Contribuindo

Você é bem-vindo para contribuir enviando uma solicitação pull para o repositório.

## Autor


[🐱‍👤 iMentx ™]      real


## License

Este projeto esta licensiado em MIT License - vê [LICENSE.md](LICENSE) para detalhes.