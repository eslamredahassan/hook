const config = require("./config.json");
const {
  Client,
  Collection,
  Intents,
  MessageActionRow,
  MessageButton,
  MessageEmbed,
  MessageSelectMenu,
} = require("discord.js");

const client = new Client({
  shards: "auto",
  partials: ["MESSAGE", "CHANNEL", "REACTION"],
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILD_BANS,
    Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
    Intents.FLAGS.GUILD_INTEGRATIONS,
    Intents.FLAGS.GUILD_WEBHOOKS,
    Intents.FLAGS.GUILD_INVITES,
    Intents.FLAGS.GUILD_VOICE_STATES,
    Intents.FLAGS.GUILD_PRESENCES,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    Intents.FLAGS.GUILD_MESSAGE_TYPING,
    Intents.FLAGS.DIRECT_MESSAGES,
    Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
    Intents.FLAGS.DIRECT_MESSAGE_TYPING,
  ],
});

const colors = require("colors");
const moment = require("moment");
const logo = require("./src/assest/logo");
const check_bots = require("./src/check_bots");
const ready = require("./src/utils/ready");
const server = require("./src/utils/server");
const antiCrash = require("./src/utils/antiCrash");
client.login(process.env.token);

client.on("ready", async () => {
  server(client, config);
  antiCrash(client, config);
  ready(client, config);
  check_bots(client, config);
});
