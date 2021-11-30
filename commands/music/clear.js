const LangHelper = require('./../../src/helpers.js')

module.exports = {
    name: 'clear',
    aliases: LangHelper.get_all_vars(['cl']),
    utilisation: '{prefix}clear',
    voiceChannel: true,

    async execute(client, message) {
        const queue = player.getQueue(message.guild.id);

        if (!queue || !queue.playing) return message.channel.send(`No music currently playing ${message.author}... try again ?`);

        if (!queue.tracks[0]) return message.channel.send(`No music in the queue after the current one ${message.author}... try again ?`);

        await queue.clear();

        message.channel.send(`The queue has just been cleared`);
    },
};