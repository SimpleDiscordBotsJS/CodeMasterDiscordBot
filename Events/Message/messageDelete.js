const { MessageEmbed, Message, WebhookClient } = require("discord.js");
const { WEBHOOKS } = require("../../Structures/config.json");
const { Error } = require("../../Utilites/Logger");

module.exports = {
    name: "messageDelete",
    /**
     * @param {Message} message 
     */
    execute(message) {
        if(message.author.bot) return;

        //Игнорируем, если сообщение, в юриздикции Anti-Scam
        //Чтобы не было ненужного сообщения
        const Filter = require(`../../Structures/Validation/ScamLinks.json`);
        const ScamFilter = Filter.some((Word) => message.content.toLowerCase().split(" ").includes(Word.toLowerCase()));
        if(ScamFilter) return;

        //Всё остальное
        const Log = new MessageEmbed().setColor("#36393f")
        .setDescription(`📕 [Сообщение](${message.url}) было **удалено**.\n
        **Удаленное сообщение:**\n \`\`\`${message.content ? message.content : "None"}\`\`\``.slice(0, 4096))
        .addField(`**Автор**`, `${message.author}`, true).addField(`**Канал**`, `<#${message.channel.id}>`, true)
        .setFooter({text: `Member: ${message.author.tag} | ID: ${message.author.id}`}).setTimestamp();

        if(message.attachments.size >= 1){
            Log.addField(`Прикреплено`, `${message.attachments.map(a => a.url).join(" ")}`, true);
        }

        new WebhookClient({url: WEBHOOKS.MESSAGE_LOG.DELETE_URL})
        .send({embeds: [Log]}).catch((err) => Error(err));
    }
}