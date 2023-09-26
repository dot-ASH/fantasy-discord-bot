import { config } from "dotenv";
import { client } from "../bot.js";
import { EmbedBuilder } from "discord.js";
import leaderBoardEmbed from "./players.js";
import fixtureEmbedded from "./fixture.js";
config();
import { whichMd } from "./reminder.js";
import { readJson } from "../server.js";

const siteUrl = "https://gaming.uefa.com/en/uclfantasy/overview";
const leagueUrl = process.env.LEAGUE_URL;
export const players = [];
let data;

let thisleg = whichMd();

data = await readJson("./data/newleaderboard.json");
data.forEach((Element) => {
  players.push(Element);
});

const FANTASY_ROLE = process.env.ROLE || "";
const CHANNEL_ID = process.env.CHANNEL_ID;

export async function sendtxt(text) {
  const Channel = client.channels.cache.find(
    (channel) => channel.id === CHANNEL_ID
  );
  const exampleEmbed = new EmbedBuilder()
    .setTitle(`Players,`)
    .setColor(0x5e548e)
    .setDescription(text)
    .setAuthor({
      name: "Fantasy League Bot",
      iconURL: "https://i1.lensdump.com/i/17MRxo.jpg",
      url: "https://gaming.uefa.com/en/uclfantasy/overview",
    });
  await Channel.send({
    content: `<@&${FANTASY_ROLE}>`,
    embeds: [exampleEmbed],
  });
}

export async function sendLeaderboard() {
  const Channel = client.channels.cache.find(
    (channel) => channel.id === CHANNEL_ID
  );
  await Channel.send({
    content: `<@&${FANTASY_ROLE}>`,
    embeds: [leaderBoardEmbed],
  });
}

export async function sendFixture() {
  const Channel = client.channels.cache.find(
    (channel) => channel.id === CHANNEL_ID
  );
  await Channel.send({
    content: `<@&${FANTASY_ROLE}>`,
    embeds: [fixtureEmbedded],
  });
}

export async function sendWinner() {
  const Channel = client.channels.cache.find(
    (channel) => channel.id === CHANNEL_ID
  );
  const winnerEmbed = new EmbedBuilder()
    .setTitle(`Congratulations to ${players[0].teamName} 👑`)
    .setURL(leagueUrl)
    .setAuthor({
      name: "Fantasy League Bot",
      iconURL: "https://i1.lensdump.com/i/17MRxo.jpg",
      url: siteUrl,
    })
    .setColor(0x5e548e)
    .addFields({
      name: `------------------------------------------------`,
      value: "\u200b",
    })
    .addFields({
      name: `You deserve it the most!`,
      value: `You have won the ultimate 2022-23 Cool People's UCL Fantasy Premier league`,
    })
    .addFields({
      name: `❃ Claim your Player Addition Jersey of your own choice @${players[0].teamName}`,
      value: `\u200b`,
    })
    .addFields({
      name: `------------------------------------------------`,
      value: "\u200b",
    });

  await Channel.send({
    content: `<@&${FANTASY_ROLE}>`,
    embeds: [winnerEmbed],
  });
}

export async function sendThnx() {
  const Channel = client.channels.cache.find(
    (channel) => channel.id === CHANNEL_ID
  );
  const winnerEmbed = new EmbedBuilder()
    .setTitle(`to you too ${players[1].teamName} ♔`)
    .setURL(leagueUrl)
    .setAuthor({
      name: "Fantasy League Bot",
      iconURL: "https://i1.lensdump.com/i/17MRxo.jpg",
      url: siteUrl,
    })
    .setColor(0x5e548e)
    .addFields({
      name: `------------------------------------------------`,
      value: "\u200b",
    })
    .addFields({
      name: `And finally this is the end of this season league <3`,
      value: "Thanking everyone and will see you soon",
    })
    .addFields({
      name: `❃ Claim your Premium Thai Jersey of your own choice @${players[1].teamName}`,
      value: `\u200b`,
    })
    .addFields({
      name: `------------------------------------------------`,
      value: "\u200b",
    });

  await Channel.send({
    content: `<@&${FANTASY_ROLE}>`,
    embeds: [winnerEmbed],
  });
}
