const { GuildScheduledEventManager, MessageEmbed, WebhookClient } = require("discord.js");

module.exports = {
    name: "guildScheduledEventDelete",
    /**
     * @param {GuildScheduledEventManager} guildScheduledEvent
     */
    async execute(guildScheduledEvent) {
        const logChannel = new WebhookClient({ url: process.env.WEBHOOK_AUDIT_EVENT });
        if(!logChannel) return;
        
        const Embed = new MessageEmbed().setColor("#ea4e4e").setTitle("🎊 __**Ивент удалён**__ 🎊")
        .setDescription(`**${guildScheduledEvent.name}** был успешно удалён: ${guildScheduledEvent.description}`)
        .addField("Тип ивента", `${guildScheduledEvent.type}`, true)
        .addField("Создатель", `${guildScheduledEvent.creator}`, true)
        .addField("Начало", `${guildScheduledEvent.scheduledStartAt}`, true)
        .addField("Окончание", `${guildScheduledEvent.scheduledEndAt}`, true)
        .setTimestamp();

        if(guildScheduledEvent.channel) {
            Embed.addField("Канал", `${guildScheduledEvent.channel}`, true);
        }

        logChannel.send({embeds: [Embed]});
    }
}