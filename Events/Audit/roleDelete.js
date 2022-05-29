const { RoleManager, MessageEmbed, WebhookClient } = require("discord.js");

module.exports = {
    name: "roleDelete",
    /**
     * @param {RoleManager} role 
     */
    async execute(role) {
        const logChannel = new WebhookClient({ url: process.env.WEBHOOK_AUDIT_ROLE });
        if(!logChannel) return;
        
        const Embed = new MessageEmbed()
        .setColor("#ea4e4e").setTitle("🚬 __**Роль удалена**__ 🚬")
        .setDescription(`**${role.name}** была успешно удалена`)
        .addField("Роль", `${role.name}`, true)
        .addField("Создана", `${role.createdAt}`, true)
        .setTimestamp();

        logChannel.send({embeds: [Embed]});
    }
}