const { GuildBanManager, EmbedBuilder, WebhookClient } = require("discord.js");

module.exports = {
    name: "guildBanAdd",
    /**
     * @param {GuildBanManager} ban 
     */
    async execute(ban) {
        const logChannel = new WebhookClient({ url: process.env.WEBHOOK_AUDIT_BAN });
        if(!logChannel) return;

        const Embed = new EmbedBuilder()
        .setColor("#e15050")
        .setTitle("🔨 __**Пользователь забанен**__ 🔨")
        .setDescription(`**${ban.user.tag}** был успешно забанен`)
        .addFields(
            { name: `Пользователь`, value: `${ban.user}`, inline: true },
            { name: `Причина`, value: `\`${ban.reason ? `${ban.reason}` : "Не указана"}\``, inline: true }
        )
        .setTimestamp();

        channel.send({ embeds: [Embed] });
    }
}