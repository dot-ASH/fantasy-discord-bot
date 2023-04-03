import { config } from "dotenv";
import { client } from "../bot.js";
import { EmbedBuilder } from "discord.js";
import leaderBoardEmbed from "./players.js";
import fixtureEmbedded from "./fixture.js"
import prevMotm from "./motm.js";
config();
const fantasy_role = process.env.ROLE || "";
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
    content: `${fantasy_role}`,
    embeds: [exampleEmbed],
  });
}

export async function sendResult() {
  const Channel = client.channels.cache.find(
    (channel) => channel.id === CHANNEL_ID
  );
  const exampleEmbed = new EmbedBuilder()
    .setTitle(`Results & Man of the matches`)
    .setColor(0x5e548e)
    .setThumbnail("https://i3.lensdump.com/i/1nEUNH.gif")
    .setAuthor({
      name: "Fantasy League Bot",
      iconURL: "https://i1.lensdump.com/i/17MRxo.jpg",
      url: "https://gaming.uefa.com/en/uclfantasy/overview",
    })

    .addFields({
      name: `Round of 16 Leg One`,
      value: `-------------------------------------------`,
    })
    .addFields({
      name: "\u200b",
      value: prevMotm,
    });
  await Channel.send({
    content: `${fantasy_role}`,
    embeds: [exampleEmbed],
  });
}

export async function sendLeaderboard() {
  const Channel = client.channels.cache.find(
    (channel) => channel.id === CHANNEL_ID
  );
  await Channel.send({
    content: `${fantasy_role}`,
    embeds: [leaderBoardEmbed],
  });
}

export async function sendFixture() {
  const Channel = client.channels.cache.find(
    (channel) => channel.id === CHANNEL_ID
  );
  await Channel.send({
    content: `${fantasy_role}`,
    embeds: [fixtureEmbedded],
  });
}
