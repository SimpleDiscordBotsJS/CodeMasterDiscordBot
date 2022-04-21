const { Message } = require("discord.js");
const { AUTORESPONDER } = require("../../Structures/config.json");

module.exports = {
    name: "messageCreate",
    /**
     * @param {Message} message
     */
    async execute(message) {
        if(message.author.bot) return;

        AUTORESPONDER.forEach((channels) => {
            if(!message.guild.channels.cache.get(channels)) return;
            if(message.channel.id != channels) return;
            message.react("👍").then(() => message.react("👎"));
        });
    }
}