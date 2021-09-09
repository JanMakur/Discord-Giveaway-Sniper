/* Import Modules */
let Cord = require('discord.js-selfbot');
let fs = require('fs');
let cp = require('child_process');
/* Make Functions to handle Errors */

/* make config for the selfbot*/
let config = require('./config.json');
let token = config['token'];
let user = new Cord.Client();

user.on('ready' , () => {
    console.log(`SUCCESSFULLY LOGGED IN AS ${user.user.tag}`)
})

user.on('message', message => {
    if (message.author.id === config.botid) {
        if (message.content.toLowerCase() == `<:yay:585696613507399692>   **GIVEAWAY**   <:yay:585696613507399692>`) {
            message.react(`tada`)
        }
        if (message.content.toLowerCase() == `Congratulations <@${user.user.id}>! You won the **nitro**!`) {
            console.log(`You Won a giveaway at ${message.guild.name}(${message.guild.id}) in channel ${message.channel.name}(${message.channel.id})`)
        }
    }
})

user.on('messageUpdate' , (m , message) => {
    if (message.author.id === config.botid) {
        message.embeds.forEach(e => {
            if ((e.split('<')[1].split('>')[0].split('@')[1]) === user.user.id) {
                user.users.get((e.split('<')[2].split('>')[0].split('@')[1])).send(config.msg).then(`Successfully sent dm to ${user.users.get((e.split('<')[2].split('>')[0].split('@')[1])).tag}`).catch(e => console.error(`Error Dming ${user.users.get((e.split('<')[2].split('>')[0].split('@')[1])).tag}: ${e}`))
            }
        })
    }
})

user.login(token)