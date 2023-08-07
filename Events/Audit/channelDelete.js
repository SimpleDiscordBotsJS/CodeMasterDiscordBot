const { ChannelManager, EmbedBuilder, WebhookClient } = require("discord.js");

module.exports = {
    name: "channelDelete",
    /**
     * @param {ChannelManager} channel
     */
    async execute(channel) {
        if(!channel.guild) return;
        if(channel.type === "GUILD_NEWS_THREAD") return;
        if(channel.type === "GUILD_PUBLIC_THREAD") return;
        if(channel.type === "GUILD_PRIVATE_THREAD ") return;
    
        const logChannel = new WebhookClient({ url: process.env.WEBHOOK_AUDIT_CHANNEL });
        if(!logChannel) return;
    
        const Embed = new EmbedBuilder().setColor("#e15050")
        .setTitle("🔰 __**Канал удалён**__ 🔰")
        .setDescription(`**${channel.name}** был успешно удалён`)
        .addFields({ name: `Канал`, value: `\`${channel.name}\``, inline: true })
        .setTimestamp();

        logChannel.send({ embeds: [Embed] });
    }
}