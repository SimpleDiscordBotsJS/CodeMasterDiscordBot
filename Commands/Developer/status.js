const { Client, MessageEmbed, CommandInteraction } = require("discord.js");
const Package = require("../../package.json");
const { connection } = require("mongoose");
require("../../Events/Client/ready");

module.exports = {
    name: "status",
    nameLocalizations: {
        "ru": "статус"
    },
    description: "Displays the status of the client and database connection.",
    descriptionLocalizations: {
        "ru": "Показать статус бота"
    },
    permission: "ADMINISTRATOR",
    /**
     * @param {CommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client) {
        const getChannelTypeSize = (type) => client.channels.cache.filter((channel) => type.includes(channel.type)).size;

        const Response = new MessageEmbed().setColor("AQUA").setThumbnail(client.user.displayAvatarURL({dynamic: true}))
        .setTitle(`${client.user.tag} Status`).setDescription(`**Client**: \`🟢 ONLINE\` - \`${client.ws.ping}ms\`
        **Database**: \`${switchTo(connection.readyState)}\`\n`).addFields(
            { name: "👩🏻‍🔧 Client", value: client.user.tag, inline: true },
            { name: "📆 Created", value: `<t:${parseInt(client.user.createdTimestamp / 1000)}:R>`, inline: true },
            { name: "⏰ Up Since", value: `<t:${parseInt(client.readyTimestamp / 1000)}:R>`, inline: true },
            { name: "💻 Platform", value: `${process.platform}`, inline: true },
            { name: "💾 CPU Usage", value: `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}%`, inline: true },
            { name: "🤹🏻‍♀️ Commands", value: `${client.commands.size}`, inline: true },
            { name: "💬 Text Channels", value: `${getChannelTypeSize(["GUILD_TEXT", "GUILD_NEWS"])}`, inline: true },
            { name: "🎤 Voice Channels", value: `${getChannelTypeSize(["GUILD_VOICE", "GUILD_STAGE_VOICE"])}`, inline: true },
            { name: "🧵 Threads", value: `${getChannelTypeSize(["GUILD_THREAD", "GUILD_NEWS_THREAD", "GUILD_PUBLIC_THREAD", "GUILD_PRIVATE_THREAD"])}`, inline: true })
        .setFooter({text: `Version: ${Package.version}`}).setTimestamp();

        interaction.reply({embeds: [Response]});
    }
}

function switchTo(val) {
    var status = " ";
    switch(val) {
        case 0 : status = `🔴 DISCONNECTED`
        break;
        case 1 : status = `🟢 CONNECTED`
        break;
        case 2 : status = `🟠 CONNECTIONG`
        break;
        case 3 : status = `🟣 DISCONNECTING`
        break;
    }
    return status;
}