import * as dotenv from "dotenv";
import { whichMd } from "./reminder.js";
import { EmbedBuilder } from "discord.js";
import { readJson } from "../server.js";

dotenv.config();
const siteUrl = "https://gaming.uefa.com/en/uclfantasy/overview";
const leagueUrl = process.env.LEAGUE_URL;
export const players = [];
let data;

let thisleg = whichMd();

// console.log(thisleg)

data = await readJson("./data/newleaderboard.json");
data.forEach((Element) => {
  players.push(Element);
});

const leaderBoardEmbed = new EmbedBuilder()
  .setTitle(thisleg)
  .setURL(leagueUrl)
  .setAuthor({
    name: "Fantasy League Bot",
    iconURL: "https://i1.lensdump.com/i/17MRxo.jpg",
    url: siteUrl,
  })
  .setColor(0x5e548e)
  .setDescription("UCL 2022 League Leaderboard")
  .addFields({
    name: `------------------------------------------------`,
    value: "\u200b",
  })
  .addFields({
    name: `Name \t---\t Total Points \t---\t Recent Points`,
    value: "\u200b",
  })
  .addFields({
    name: `------------------------------------------------`,
    value: "\u200b",
  });
players.forEach((player) => {
  leaderBoardEmbed
    .addFields({
      name: `${player.teamName} \t---\t ${player.overallPoints} \t---\t ${player.currentGamedayPoints}`,
      value: "\u200b",
    })
    .setFooter({
      text: players[0].teamName,
      iconURL: "https://i.lensdump.com/i/1lVeXr.gif",
    });
});
leaderBoardEmbed.addFields({
  name: `------------------------------------------------`,
  value: "\u200b",
});

export default leaderBoardEmbed.toJSON();
