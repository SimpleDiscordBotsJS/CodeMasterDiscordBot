const { CommandInteraction, MessageEmbed } = require('discord.js');
const LevelDB = require('../../Structures/Schemas/Leveling/LevelingDB');
const { getLevelExp } = require("../../Utilites/LevelFucntions");

module.exports = {
    name: 'leaderboard',
    description: 'Показать лидеров',
    cooldown: 10000,
    /**
     * @param {CommandInteraction} interaction
     */
    async execute(interaction) {
        const Embed = new MessageEmbed().setColor("GREEN").setTitle("📜 Рейтинг участников")
        .setFooter({text: `Запросил: ${interaction.member.displayName}`});

        if(interaction.guild.iconURL() == null) 
            Embed.setThumbnail(interaction.client.user.avatarURL({dynamic: true, size: 256}));
        else Embed.setThumbnail(interaction.guild.iconURL({dynamic: true, size: 256}));

        //Embed.setAuthor({name: `Страница {} из {} - Всего участников: ${interaction.guild.members.fetch()}`});

        const results = await LevelDB.find({ GuildID: interaction.guild.id }).sort({ Level: -1 }).limit(10);

        for (let counter = 0; counter < results.length; ++counter) {
            const { UserID, Level = 0, XP } = results[counter];

            var TotalXP = 0;
            if(Level == 0) TotalXP = XP;
            else TotalXP = await getLevelExp(Level) + XP;

            const User = interaction.guild.members.cache.find(user => user.id === UserID);

            Embed.addField(`**#${counter + 1}.** ${User.displayName}`, `**Уровень**: \`${Level}\` | **Опыт**: \`${TotalXP}\``);
        }

        if(Embed.fields.length <= 0) return interaction.reply({embeds: [Embed.setDescription("**На этом сервере, ещё нет лидеров!**")]});
        else return interaction.reply({embeds: [Embed]});
    }
}