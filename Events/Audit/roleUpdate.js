const { RoleManager, EmbedBuilder, WebhookClient } = require("discord.js");

module.exports = {
    name: "roleUpdate",
    /**
     * @param {RoleManager} oldRole 
     * @param {RoleManager} newRole 
     */
    async execute(oldRole, newRole) {
        const logChannel = new WebhookClient({ url: process.env.WEBHOOK_AUDIT_ROLE });
        if(!logChannel) return;
        
        if(oldRole.name !== newRole.name) {
            const Embed = new EmbedBuilder()
            .setColor("#3ccffa").setTitle("🚬 __**Роль изменена**__ 🚬")
            .setDescription(`${newRole} | Имя роли было обновлено`)
            .addFields(
                { name: "Старое имя", value: `\`${oldRole.name}\`` },
                { name: "Новое имя", value: `\`${newRole.name}\`` }
            )
            .setTimestamp();

            logChannel.send({ embeds: [Embed] });
        }
        if(oldRole.hexColor !== newRole.hexColor) {
            const Embed = new EmbedBuilder()
            .setColor("#3ccffa").setTitle("🚬 __**Роль изменена**__ 🚬")
            .setDescription(`${newRole} | Цвет роли был обновлён`)
            .addFields(
                { name: "Старый цвет", value: `\`${oldRole.hexColor}\`` },
                { name: "Новый цвет", value: `\`${newRole.hexColor}\`` }
            )
            .setTimestamp();

            logChannel.send({ embeds: [Embed] });
        }
        if(oldRole.hoist !== newRole.hoist) {
            const Embed = new EmbedBuilder()
            .setColor("#3ccffa").setTitle("🚬 __**Роль изменена**__ 🚬")
            .setDescription(`${newRole} | hoist has been updated`)
            .addFields(
                { name: "Старый hoist", value: `${oldRole.hoist}` },
                { name: "Новый hoist", value: `${newRole.hoist}` }
            )
            .setTimestamp();

            logChannel.send({ embeds: [Embed] });
        }
        if(oldRole.icon !== newRole.icon) {
            const Embed = new EmbedBuilder()
            .setColor("#3ccffa").setTitle("🚬 __**Роль изменена**__ 🚬")
            .setDescription(`${newRole} | Иконка роли была обновлена`)
            .addFields(
                { name: "Старая иконка", value: `${oldRole.icon ? oldRole.iconURL : "None"}` },
                { name: "Новая иконка", value: `${newRole.icon ? newRole.iconURL : "None"}` }
            )
            .setTimestamp();

            logChannel.send({ embeds: [Embed] });
        }
        if(oldRole.mentionable !== newRole.mentionable) {
            const Embed = new EmbedBuilder()
            .setColor("#3ccffa").setTitle("🚬 __**Роль изменена**__ 🚬")
            .setDescription(`${newRole} | Параметр упоминания был обновлён`)
            .addFields(
                { name: "Старый параметр", value: `\`${oldRole.mentionable}\`` },
                { name: "Новый параметр", value: `\`${newRole.mentionable}\`` }
            )
            .setTimestamp();

            logChannel.send({ embeds: [Embed] });
        }
        if(oldRole.position !== newRole.position) {
            const Embed = new EmbedBuilder()
            .setColor("#3ccffa").setTitle("🚬 __**Роль изменена**__ 🚬")
            .setDescription(`${newRole} | Позиция роли была обновлена`)
            .addFields(
                { name: "Старая позиция", value: `\`${oldRole.position}\`` },
                { name: "Новая позиция", value: `\`${newRole.position}\`` }
            )
            .setTimestamp();

            logChannel.send({ embeds: [Embed] });
        }
    }
}