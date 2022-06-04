const { GuildScheduledEventManager, MessageEmbed, WebhookClient } = require("discord.js");

module.exports = {
    name: "guildScheduledEventCreate",
    /**
     * @param {GuildScheduledEventManager} guildScheduledEvent
     */
    async execute(guildScheduledEvent) {
        const logChannel = new WebhookClient({ url: process.env.WEBHOOK_AUDIT_EVENT });
        if(!logChannel) return;
        
        const Embed = new MessageEmbed().setColor("#70ec46").setTitle("🎊 __**Ивент создан**__ 🎊")
        .setDescription(`**${guildScheduledEvent.name}** был успешно создан: ${guildScheduledEvent.description}`)
        .addField("Тип ивента", `\`${guildScheduledEvent.type}\``, true)
        .addField("Создатель", `${guildScheduledEvent.creator}`, true)
        .addField("Начало", `<t:${parseInt(guildScheduledEvent.scheduledStartAt / 1000)}:R>`, true)
        .addField("Окончание", `${guildScheduledEvent.scheduledEndAt ? ("<t:" + parseInt(guildScheduledEvent.scheduledEndAt / 1000) + ":R>") : "\`None\`"}`, true)
        .setTimestamp();

        if(guildScheduledEvent.channel) {
            Embed.addField("Канал", `${guildScheduledEvent.channel}`, true);
        }

        logChannel.send({embeds: [Embed]});
    }
}