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
    if (!message.author.id === config.botid) return;
        if (message.content == `<:yay:585696613507399692>   **GIVEAWAY**   <:yay:585696613507399692>`) {
            setTimeout(function() {
                message.react(`🎉`);
            },config['react_timeout']*1000)
        }
        if (message.content == `Congratulations <@${user.user.id}>! You won the **nitro**!`) {
            console.log(`You Won a giveaway at ${message.guild.name}(${message.guild.id}) in channel ${message.channel.name}(${message.channel.id})`)
        }
})

user.on('messageUpdate' , (m , message) => {
    if (!message.author.id === config.botid) return;
        message.embeds.forEach(e => {
            try {
                if ((e.description.split('<')[1].split('>')[0].split('@')[1]) === user.user.id) {
                    setTimeout(function() {
                        user.users.cache.get((e.description.split('<')[2].split('>')[0].split('@')[1])).send(config.msg).then(`Successfully sent dm to ${user.users.cache.get((e.description.split('<')[2].split('>')[0].split('@')[1])).tag}`).catch(e => console.error(`Error Dming ${user.users.cache.get((e.description.split('<')[2].split('>')[0].split('@')[1])).tag}: ${e}`))
                    },config['dm_timeout']*1000)
                }
            } catch(err) {
                return;
            }
        })
})

user.login(token)
