const { Client, ActivityType } = require("discord.js");
const moment = require("moment");

//// Application Sun ///

module.exports = async (client, config) => {
  const statusArray = [
    {
      type: 3, // WATCHING
      content: `Bots Here`,
      status: "idle",
    },
    {
      type: 0, // PLAYING
      type: 0, // PLAYING
      content: `With Discord.js`,
      status: "idle",
    },
    //'PLAYING [0]', 'STREAMING [1]', 'LISTENING [2]', 'WATCHING [3]', 'CUSTOM [4]', 'COMPETING [5]'
  ];
  async function pickPresence() {
    const option = Math.floor(Math.random() * statusArray.length);
    await client.user.setPresence({
      activities: [
        {
          name: statusArray[option].content,
          type: statusArray[option].type,
          url: statusArray[option].url,
        },
      ],
      status: statusArray[option].status,
    });
  }
  setInterval(pickPresence, 30000);
  console.log(
    `\x1b[0m`,
    `\x1b[31m 〢`,
    `\x1b[33m ${moment(Date.now()).format("LT")}`,
    `\x1b[31m Status Activity`,
    `\x1b[32m UPDATED`,
  );
};
