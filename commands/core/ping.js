const ms = require('ms');
const LangHelper = require('./../../src/helpers.js')

module.exports = {
    name: 'ping',
    aliases: LangHelper.get_all_vars(['pi']),

    execute(client, message) {
        message.channel.send(`Last heartbeat calculated 
        ${ms(
            Date.now() - client.ws.shards.first().lastPingTimestamp,
            { long: true })} ago **${client.ws.ping}ms**`
        );
    },
};