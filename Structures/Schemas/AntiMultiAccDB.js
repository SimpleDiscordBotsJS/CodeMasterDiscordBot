const { model, Schema } = require("mongoose");

module.exports = model("Anti-MultiAccounts", new Schema({
    GuildID: String,
    ChannelID: String
})); 