const { CommandInteraction, MessageEmbed, MessageAttachment } = require("discord.js");
const LevelDB = require("../../Structures/Schemas/Leveling/LevelingDB");
const { getLevelExp } = require("../../Utilites/LevelFucntions");
const { read, AUTO, MIME_PNG, BLEND_MULTIPLY } = require("jimp");
const { createCanvas, loadImage, registerFont } = require("canvas");
//const { join } = require("path");

registerFont(`${process.cwd()}/Structures/Fonts/Helvetica.ttf`, { family: `Helvetica Normal` });
registerFont(`${process.cwd()}/Structures/Fonts/Helvetica-Bold.ttf`, { family: `Helvetica Bold` });

module.exports = {
    name: "rank",
    description: "Показать ранг",
    cooldown: 10000,
    options: [{ name: "target", description: "Выберите пользователя", type: "USER", required: false }],
    /**
     * @param {CommandInteraction} interaction
     */
    async execute(interaction) {
        const Target = interaction.options.getMember("target") || interaction.member;

        const UserLevel = await LevelDB.findOne({ GuildID: interaction.guild.id, UserID: Target.id });

        if(!UserLevel) {
            const balEmbed = new MessageEmbed().setTitle(`Ранг ${Target.displayName}`)
            .setDescription(`${Target.user} ещё не имеет ранга.`).setColor("GREEN");

            return interaction.reply({embeds: [balEmbed], ephemeral: true});
        } else {
            interaction.deferReply();

            const required = (await getLevelExp(UserLevel.Level)).valueOf();

            const totalRank = await LevelDB.find({ GuildID: interaction.guild.id }).sort({ XP: -1 });
            let ranking = totalRank.map(x => x.XP).indexOf(UserLevel.XP) + 1;

            //Канвас
            //const canvas = createCanvas(1000, 333)
            //const ctx = canvas.getContext("2d");
            //const background = await loadImage(join(__dirname, "..", "..", "Structures", "Images", "wallpaper.png"));
            /*ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

            ctx.beginPath();
            ctx.lineWidth = 4;
            ctx.strokeStyle = "#A3A3A3"
            ctx.globalAlpha = 0.2;
            ctx.fillStyle = "#000000"
            ctx.fillRect(180, 216, 775, 65);
            ctx.fill();
            ctx.globalAlpha = 1;
            ctx.strokeRect(180, 216, 775, 65);
            ctx.stroke();
            
            ctx.fillStyle = "#2ECC71";
            ctx.globalAlpha = 0.6;
            ctx.fillRect(200, 216, ((100 / (required)) * UserLevel.XP) * 7.5, 65);
            ctx.fill();
            ctx.globalAlpha = 1; 

            ctx.font = '30px sans-serif';
            ctx.textAlign = "center";
            ctx.fillStyle = "#beb1b1";
            ctx.fillText(`${UserLevel.XP} / ${required} XP`, 600, 260);

            ctx.font = '35px sans-serif';
            ctx.textAlign = "left";
            ctx.fillText(Target.displayName, 325, 125);

            ctx.font = '40px sans-serif';
            ctx.fillText("Level: ", 350, 170);
            ctx.fillText(UserLevel.Level, 500, 170);

            ctx.font = '40px sans-serif';
            ctx.fillText("Rank: ", 700, 170);
            ctx.fillText(ranking, 830, 170);

            ctx.arc(170, 160, 120, 0, Math.PI * 2, true);
            ctx.lineWidth = 6;
            ctx.strokeStyle = "#A3A3A3"
            ctx.stroke();
            ctx.closePath();
            ctx.clip();
            const avatar = await loadImage(Target.user.displayAvatarURL({dynamic: true, format: "png"}));
            ctx.drawImage(avatar, 40, 40, 250, 250);*/


            

            //New canvas
            await Target.user.fetch();

            let userName = Target.displayName;

            if(userName.length >= 19) userName = userName.substring(0, 18) + "..";

            const canvas = createCanvas(885, 303);
            const ctx = canvas.getContext("2d");

            ctx.font = "50px Helvetica Normal";
            ctx.textAlign = "left";
            ctx.fillStyle = "#FFFFFF";
            ctx.fillText(userName, 300, 125);

            /*ctx.font = "60px Helvetica Bold";
            ctx.textAlign = "left";
            ctx.fillStyle = "#c7c7c7";
            ctx.fillText(`#${Target.user.discriminator}`, 300, 215);*/

            /*ctx.beginPath();
            ctx.lineWidth = 4;
            ctx.strokeStyle = "#A3A3A3"
            ctx.globalAlpha = 0.2;
            ctx.fillStyle = "#000000"
            ctx.fillRect(280, 216, 583, 65);
            ctx.fill();
            ctx.globalAlpha = 1;
            ctx.strokeRect(280, 216, 583, 65);
            ctx.stroke();*/

            ctx.font = `30px Helvetica Bold`;
            ctx.textAlign = "left";
            ctx.fillStyle = "#FFFFFF";
            ctx.fillText("#" + ranking, 292.5, 197.5);

            ctx.font = `30px Helvetica Bold`;
            ctx.textAlign = "left";
            ctx.fillStyle = "#FFFFFF";
            ctx.fillText("Level: " + UserLevel.Level, 292.5, 230);

            ctx.font = `30px Helvetica Bold`;
            ctx.textAlign = "left";
            ctx.fillStyle = "#FFFFFF";
            ctx.fillText("🍪: " + UserLevel.Cookies, 292.5 + 175, 230);

            ctx.font = '30px Helvetica Bold';
            ctx.fillStyle = "#FFFFFF";
            ctx.textAlign = "right";
            ctx.fillText(`XP: ${UserLevel.XP} / ${required} `, 852.5, 230);

            //Progress bar
            //Пустой
            ctx.fillStyle = "#FFFFFF";
            ctx.arc(280 + 18.5, 207 + 18.5 + 36.25, 18.5, 1.5 * Math.PI, 0.5 * Math.PI, true);
            ctx.fill();
            ctx.fillRect(280 + 18.5, 207 + 36.25, 583 - 18.5 - 18.5, 37.5);
            ctx.arc(280 + 583 - 18.5, 207 + 18.5 + 36.25, 18.75, 1.5 * Math.PI, 0.5 * Math.PI, false);
            ctx.fill();

            ctx.beginPath();

            //Заполненный
            ctx.fillStyle = "#2ECC71";
            ctx.arc(280 + 18.5, 207 + 18.5 + 36.25, 18.5, 1.5 * Math.PI, 0.5 * Math.PI, true);
            ctx.fill();
            ctx.fillRect(280 + 18.5, 207 + 36.25, _calculateProgress(UserLevel.XP, required), 37.5);
            ctx.arc(280 + 18.5 + _calculateProgress(UserLevel.XP, required), 207 + 18.5 + 36.25, 18.75, 1.5 * Math.PI, 0.5 * Math.PI, false);
            ctx.fill();

            function _calculateProgress(cx, rx) {
                if(rx <= 0) return 1;
                if(cx > rx) return 583 - 18.5 - 18.5;

                let width = (cx * 583) / rx;
                if(width > 583 - 18.5 - 18.5) width = 583 - 18.5 - 18.5;
                return width;
            }

            //Other
            /*ctx.fillStyle = "#2ECC71";
            ctx.globalAlpha = 0.6;
            ctx.fillRect(280, 216, ((100 / (required)) * UserLevel.XP) * 5.8, 65);
            ctx.fill();
            ctx.globalAlpha = 1;

            ctx.font = '30px Helvetica Bold';
            ctx.textAlign = "center";
            ctx.fillStyle = "#FFFFFF";
            ctx.fillText(`${UserLevel.XP} / ${required} XP`, 600, 260);*/

            let userAvatar = Target.user.defaultAvatarURL;

            if(Target.user.avatarURL() != null) {
                userAvatar = Target.user.avatarURL({ format: "png", size: 1024 });
            }

            let background = userAvatar

            if(Target.user.bannerURL() !== null) {
                background = Target.user.bannerURL({ format: "png", dynamic: false });
            }

            const canvasJimp = await read(canvas.toBuffer());
            const base = await read(`${process.cwd()}/Structures/Images/Rank/UserBase.png`);
            const capa = await read(`${process.cwd()}/Structures/Images/Rank/UserProfile.png`);
            const mask = await read(`${process.cwd()}/Structures/Images/Rank/mask.png`);
            const mark = await read(`${process.cwd()}/Structures/Images/Rank/mark.png`);

            const avatarBackground = await read(background);
            const avatarProfile = await read(userAvatar);

            const badges = [];

            //Load badges
            if(Target.user.displayAvatarURL({dynamic: true})?.endsWith(".gif")){
                const nitro = await read(`${process.cwd()}/Structures/Images/Rank/Badges/NITRO.png`)
                const boost = await read(`${process.cwd()}/Structures/Images/Rank/Badges/BOOST.png`)
                badges.push(nitro, boost)
            }
            
            const flags = (Target.user.flags || (await Target.user.fetchFlags())).toArray();

            if(Target.user.bannerURL() !== null) {
                avatarBackground.resize(885, 303);
                avatarBackground.opaque()
                avatarBackground.blur(5);
                base.composite(avatarBackground, 0, 0);
            } else {
                avatarBackground.resize(900, AUTO);
                avatarBackground.opaque()
                avatarBackground.blur(5);
                base.composite(avatarBackground, 0, -345);
            }


            //Load avatar
            avatarProfile.resize(225, 225);
            avatarProfile.opaque()
            avatarProfile.circle()
            avatarProfile.shadow({ size: 1, opacity: 0.3, y: 3, x: 0, blur: 2 });
            base.composite(avatarProfile, 47, 39);

            //Load canvas
            canvasJimp.shadow({ size: 1, opacity: 0.3, y: 3, x: 0, blur: 2 });
            base.composite(capa, 0, 0);
            base.composite(canvasJimp, 0, 0);


            mark.opacity(0.5)
            base.composite(mark, 0, 0, {mode: BLEND_MULTIPLY})
            base.mask(mask)

            //Load badges
            if(!Target.user.bot){
                for (let i = 0; i < flags.length; i++) {
                    let badge = await read(`${process.cwd()}/Structures/Images/Rank/Badges/${flags[i]}.png`);
                    badges.push(badge);
                }
        
                let x = 800;
                for (let i = 0; i < badges.length; i++) {
                    badges[i].resize(60, AUTO);
                    badges[i].shadow({ size: 1, opacity: 0.3, y: 3, x: 0, blur: 2 });
                    badges[i].opacity(0.9)
                    base.composite(badges[i], x, 15);
                    x -= 60;
                }  
            }

            const buffer = await base.getBufferAsync(MIME_PNG);

            interaction.followUp({files: [new MessageAttachment(buffer, "profile.png")]});
            //return interaction.reply({files: [new MessageAttachment(canvas.toBuffer())]});
        }
    }
}