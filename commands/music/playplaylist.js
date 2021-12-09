const { QueryType, Track } = require('discord-player');
const LangHelper = require('../../src/helpers.js')
const play = require('./play')

module.exports = {
    name: 'pl1',
    aliases: LangHelper.get_all_vars(['pl1']),
    utilisation: '{prefix}play [song name/URL]',
    voiceChannel: true,

    async execute(client, message, args) {

        args = []
        args_dan = [
            ['https://www.youtube.com/watch?v=eYsF2gs_f_A'], 
            ['https://www.youtube.com/watch?v=RPAhtWJ12G8'], 
            ['https://www.youtube.com/watch?v=Vls1qMmutrw'], 
            ['https://www.youtube.com/watch?v=ngdSBRQH35Q']
        ]

        args = args_dan

        async function first(arg) {
            play.execute(client, message, arg);
        }

        async function rest(arg) {
            return new Promise((resolve) => {
                setTimeout(() => {
                  play.execute(client, message, arg);
                  resolve();
                }, 5000)
              }); 
        }

        for (let index = 0; index < args.length; index++) {
            if (index == 0) {
                await first(args[index]);
            } else {
                await rest(args[index]);
            }
        }

    },
};