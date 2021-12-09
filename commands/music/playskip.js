const { QueryType } = require('discord-player');
const LangHelper = require('../../src/helpers.js')
const skip = require('./skip')

module.exports = {
    name: 'play new, skip prev',
    aliases: LangHelper.get_all_vars(['psk']),
    utilisation: '{prefix}psk [song name/URL]',
    voiceChannel: true,

    async execute(client, message, args) {
        if (!args[0]) return message.channel.send(`Please enter a valid search ${message.author}... try again ?  `);

        const res = await player.search(args.join(' '), {
            requestedBy: message.member,
            searchEngine: QueryType.AUTO
        });

        if (!res || !res.tracks.length) return message.channel.send(`No results found ${message.author}... try again ?  `);

        const queue = await player.createQueue(message.guild, {
            metadata: message.channel
        });

        try {
            if (!queue.connection) await queue.connect(message.member.voice.channel);
        } catch {
            await player.deleteQueue(message.guild.id);
            return message.channel.send(`I can't join the voice channel ${message.author}... try again ?  `);
        }

        await message.channel.send(`Loading your ${res.playlist ? 'playlist' : 'track'}...  `);

        res.playlist ? queue.addTracks(res.tracks) : queue.addTrack(res.tracks[0]);

        skip.execute(client, message);

        if (!queue.playing) await queue.play();
    },
};