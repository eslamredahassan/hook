const config = require("../config.json");
const {
  Client,
  Collection,
  Intents,
  MessageActionRow,
  MessageButton,
  MessageEmbed,
  MessageSelectMenu,
} = require("discord.js");
const moment = require("moment");

module.exports = async (client, config) => {
  const { PresenceUpdateStatus } = require("discord-api-types/v9");
  const { Presence } = require("discord.js");

  client.on("presenceUpdate", async (oldPresence, newPresence) => {
    try {
      if (!oldPresence || !oldPresence.user.bot) return;
      if (oldPresence.status == newPresence.status) return;

      if (config.Servers) {
        /* Bot went online. */
        if (newPresence.status == PresenceUpdateStatus.Online) {
          newPresence.guild.channels.cache.get(config.Channels).send({
            embeds: [
              new MessageEmbed()
                .setTitle(`Uptime Alert`)
                .setDescription(
                  `:green_circle: **${newPresence.user.username} is back **Online!**`,
                )
                .setColor(`#2b2d31`)
                .setFooter(
                  `Uptime Alert of ${newPresence.user.username}`,
                  newPresence.user.avatarURL({ format: "png", size: 1024 }),
                )
                .setTimestamp(),
            ],
          });
          console.log(
            `\x1b[0m`,
            `\x1b[31m 〢`,
            `\x1b[33m ${moment(Date.now()).format("LT")}`,
            `\x1b[31m ${newPresence.user.tag}`,
            `\x1b[32m UP`,
          );
        } else if (
          /* Bot went offline. */
          newPresence.status == PresenceUpdateStatus.Offline ||
          newPresence.status == PresenceUpdateStatus.Invisible
        ) {
          newPresence.guild.channels.cache.get(config.Channels).send({
            embeds: [
              new MessageEmbed()
                .setTitle(`Downtime Alert of ${newPresence.user.username}`)
                .setDescription(
                  `:red_circle: ${newPresence.user.username} went **Offline!**`,
                )
                .setColor(`#2b2d31`)
                .setFooter(
                  `Downtime Alert `,
                  newPresence.user.avatarURL({ format: "png", size: 1024 }),
                )
                .setTimestamp(),
            ],
          });
          console.log(
            `\x1b[0m`,
            `\x1b[31m 〢`,
            `\x1b[33m ${moment(Date.now()).format("LT")}`,
            `\x1b[31m ${newPresence.user.tag}`,
            `\x1b[33m DOWN`,
          );
        }
      }
    } catch (err) {
      return Promise.reject(err);
    }
  });
};
