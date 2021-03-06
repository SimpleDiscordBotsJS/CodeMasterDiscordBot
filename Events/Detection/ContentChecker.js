const { Message, MessageEmbed } = require("discord.js");

module.exports = {
    name: "messageCreate",
    /**
     * @param {Message} message
     */
    async execute(message) {
        if(message.author.bot) return;
        if(message.channel.type == "DM") return;
        if(message.guild.ownerId == message.author.id) return;
        if(message.member.permissions.has(["MANAGE_MESSAGES"])) return;

        const { author, content } = message;

        const Embed = new MessageEmbed().setColor("RED").setTimestamp()
        .setThumbnail(`${author.displayAvatarURL({ dynamic: true })}`)
        .addField("Нарушитель:", `\`\`\`${author.tag} (${author.id})\`\`\``);

        // ============================================================ //

        let ipRegex = /([0-9]{1,3}\.){3}[0-9]{1,3}/;
        if(content.match(ipRegex)) {
            if(content.match("127.0.0.1")) return;
            if(content.match("192.168.0.1")) return;

            if(message.guild.me.permissionsIn(message.channel).has(["SEND_MESSAGES", "MANAGE_MESSAGES"])) {
                message.delete().catch(() => {})

                Embed.setTitle("__**Обнаружен IP адрес!**__")
                .setDescription(`Пожалуйста, не отправляйте IP адреса!`);
            
                return await message.channel.send({embeds: [Embed]}).then((m) => setTimeout(() => m.delete(), 15000));
            } else {
                return Warning("У бота отсутствуют в канале необходимые права: SEND_MESSAGES & MANAGE_MESSAGES");
            }
        }
        
        // ============================================================ //
        /* Часть старой версии регулярного выражения
        const protocol = '(?:(?:http|https)://)?';
        const subdomain = '(?:www.)?';
        const domain = '(?:disco|discord|discordapp).(?:com|gg|io|li|me|net|org)';
        const path = '(?:/(?:invite))?/([a-z0-9-.]+)'; */

        const inviteRegex = /(http|https?:\/\/)?(www\.|canary\.|ptb\.)?discord(\.gg|(app)?\.com\/invite|\.(me|io|li|net|org))\/([a-z0-9-.]+)\/?/gi;
        // До модификации: /(https?:\/\/)?(www\.|canary\.|ptb\.)?discord(\.gg|(app)?\.com\/invite|\.me)\/([^ ]+)\/?/gi - не самая выгодная реализация

        // const inviteRegex = `(${protocol}${subdomain}(${domain}${path}))`; // Старое регулярное выражение
        // или: /((?:(?:http|https):\/\/)?(?:www.)?((?:disco|discord|discordapp).(?:com|gg|io|li|me|net|org)(?:\/(?:invite))?\/([a-z0-9-.]+)))/i

        if(content.match(inviteRegex)) {
            if(message.guild.me.permissionsIn(message.channel).has(["SEND_MESSAGES", "MANAGE_MESSAGES"])) {
                message.delete();

                Embed.setTitle("__**Обнаружено приглашение на другой сервер!**__")
                .setDescription(`Пожалуйста, не отправляйте приглашения!`);
            
                return await message.channel.send({embeds: [Embed]}).then((m) => setTimeout(() => m.delete(), 7000));
            } else {
                return Warning("У бота отсутствуют в канале необходимые права: SEND_MESSAGES & MANAGE_MESSAGES");
            }
        }


        // TODO: Добавить отправку в лог канал. Не знаю зачем, но почему бы и нет...
    }
}