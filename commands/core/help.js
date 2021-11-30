const { MessageEmbed } = require('discord.js');
const LangHelper = require('./../../src/helpers.js')

module.exports = {
    name: 'help',
    aliases: LangHelper.get_all_vars(['h']),
    showHelp: false,

    execute(client, message, args) {
        const embed = new MessageEmbed();

        embed.setColor('Blue');
        embed.setAuthor(client.user.username, client.user.displayAvatarURL({ size: 1024, dynamic: true }));

        const commands = client.commands.filter(x => x.showHelp !== false);

        embed.setDescription('Description');
        embed.addField(`Enabled - ${commands.size}`, commands.map(x => `\`${x.name}${x.aliases[0] ? ` (${x.aliases.map(y => y).join(', ')})\`` : '\`'}`).join(' | '));

        embed.setTimestamp();
        embed.setFooter('');

        message.channel.send({ embeds: [embed] });
    },
};