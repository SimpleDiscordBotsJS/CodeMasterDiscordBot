const { GuildBanManager, MessageEmbed, WebhookClient } = require("discord.js");

module.exports = {
    name: "guildBanAdd",
    /**
     * @param {GuildBanManager} ban 
     */
    async execute(ban) {
        const logChannel = new WebhookClient({ url: process.env.WEBHOOK_AUDIT_BAN });
        if(!logChannel) return;

        const Embed = new MessageEmbed()
        .setColor("#e15050")
        .setTitle("🔨 __**Пользователь забанен**__ 🔨")
        .setDescription(`**${ban.user.tag}** был успешно забанен`)
        .addField(`Пользователь`, `${ban.user}`, true)
        .addField(`Причина`, `${ban.reason ? `${ban.reason}` : "Не указана"}`, true)
        .setTimestamp();

        channel.send({embeds: [Embed]});
    }
}