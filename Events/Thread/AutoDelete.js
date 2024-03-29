const { ThreadChannel } = require("discord.js");
const { DELETE_THREAD_TO_CHANNELS } = require("../../Structures/Data/Configs/config.json");
const { Error } = require("../../Structures/Utilities/Logger");

module.exports = {
    name: "threadCreate",
    /**
     * @param {ThreadChannel} thread 
     */
    async execute(thread) {
        DELETE_THREAD_TO_CHANNELS.forEach(async (channel) => {
            if(!thread.guild.channels.cache.get(channel)) return;
            if(thread.parent.id != channel) return;

            await thread.delete().catch(e => {
                return Error(`[Thread/AutoDelete] Произошла ошибка:\n${e}`);
            });;
        });
    }
}