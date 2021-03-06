const { MessageEmbed, WebhookClient, GuildMember } = require("discord.js");

module.exports = {
    name: "guildMemberAdd",
    /**
     * @param {GuildMember} member
     */
    async execute(member) {
        const { user, guild } = member;

        //member.roles.add("");

        //Проверка на наличие вебхука
        if(!process.env.WEBHOOK_JOIN) return;

        const Welcomer = new WebhookClient({ url: process.env.WEBHOOK_JOIN });

        const Welcome = new MessageEmbed().setColor("AQUA")
        .setAuthor({ name: user.tag, iconURL: user.avatarURL({dynamic: true, size: 512}) })
        .setThumbnail(user.avatarURL({dynamic: true, size: 512}))
        .setDescription(`Рады приветствовать ${member} на **${guild.name}**!\n\nАккаунт создан: <t:${parseInt(user.createdTimestamp / 1000)}:R>\nВсего на сервере: **${guild.memberCount}** человек`)
        .addFields(
            {name: `**Новости:**`, value: `<#962053378584752178>`, inline: true},
            {name: `**Правила:**`, value: `<#962054528834863194>`, inline: true},
            {name: `**Чат:**`, value: `<#962052402259837029>`, inline: true}
        )
        .setFooter({text: `ID: ${user.id}`}).setTimestamp();

        await Welcomer.send({ embeds: [Welcome]});
    }
}