const { CommandInteraction, MessageEmbed } = require("discord.js");
const DB = require("../../Structures/Schemas/Moderation/WarningDB");

module.exports = {
    name: "warnings",
    nameLocalizations: {
        "ru": "преды"
    },
    description: "Show warnings",
    descriptionLocalizations: {
        "ru": "Показать предупреждения"
    },
    cooldown: 10000, 
    options: [{ 
        name: "target",
        nameLocalizations: {
            "ru": "пользователь"
        },
        description: "Select target",
        descriptionLocalizations: {
            "ru": "Выбрать пользователя"
        },
        type: "USER", required: false 
    }],
    /**
     * @param {CommandInteraction} interaction 
     */
    async execute(interaction) {
        const { options, guild } = interaction;
        const Target = options.getMember("target") || interaction.member;

        if(Target.user.bot)
        return interaction.reply({embeds: [new MessageEmbed().setColor("RED")
            .setDescription(`Откуда у бота предупреждения?`).setTimestamp()
            ], ephemeral: true});;

        DB.findOne({ GuildID: guild.id, UserID: Target.id }, async (err, data) => {
            if(err) throw err;
            if(data) {
                const Embed = new MessageEmbed().setTitle("Предупреждения:").setColor("BLURPLE")
                .setAuthor({name: Target.user.tag, iconURL: Target.displayAvatarURL({dynamic: true})})
                .setThumbnail(Target.displayAvatarURL({dynamic: true, size: 512})).setTimestamp();

                interaction.reply({embeds: [Embed.setDescription(`${data.Content.map(
                        (w, i) => `**ID**: \`${w.WarningID}\`
                        **Выдал**: <@${w.ExecuterID}>
                        **Истекает**: ${w.Duration ? `<t:${parseInt(w.Duration / 1000)}:R>` : "**Никогда**"}
                        **Дата выдачи**: ${w.Date}
                        **Причина**: ${w.Reason}\n\n`
                    ).join(" ")}`)
                ]});
            } else {
                interaction.reply({embeds: [new MessageEmbed().setTitle("WARNING").setColor("BLURPLE")
                    .setDescription(`${Target.user} не имеет предупреждений.`)
                    .setFooter({text: `ID: ${Target.id}`}).setTimestamp()
                ], ephemeral: true});
            }
        });
    }
}