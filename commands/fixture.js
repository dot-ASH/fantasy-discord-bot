import * as dotenv from "dotenv";
import { EmbedBuilder } from "discord.js";
import { matchDays, whichMd, localTime, dateFormate } from "./reminder.js";
import moment from "moment-timezone";

dotenv.config();
const siteUrl = "https://gaming.uefa.com/en/uclfantasy/overview";
const fixtureUrl =
  "https://www.uefa.com/uefachampionsleague/fixtures-results/#/rd/2001674-1";

let nextMatchday;
let thisleg = whichMd();

switch (thisleg) {
  case "Matchday 1":
    nextMatchday = matchDays[0].matches[0].date;
    break;
  case "Matchday 2":
    nextMatchday = matchDays[1].matches[0].date;
    break;
  case "Matchday 3":
    nextMatchday = matchDays[2].matches[0].date;
    break;
  case "Matchday 4":
    nextMatchday = matchDays[3].matches[0].date;
    break;
  case "Matchday 5":
    nextMatchday = matchDays[4].matches[0].date;
    break;
  case "Matchday 6":
    nextMatchday = matchDays[5].matches[0].date;
    break;
  default:
    nextMatchday = moment();
    break;
}

let remainingDay = moment(
  dateFormate(localTime(nextMatchday)),
  "MMMM Do YYYY, h:mm:ss a"
).fromNow();

const fixtureEmbedded = new EmbedBuilder()
  .setTitle("Click here to see the fixture")
  .setURL(fixtureUrl)
  .setAuthor({
    name: "Fantasy League Bot",
    iconURL: "https://i1.lensdump.com/i/17MRxo.jpg",
    url: siteUrl,
  })
  .addFields({
    name: `Current matchday: ${thisleg}`,
    value: "\u200b",
  })
  .setColor(0x5e548e)
  .setFooter({
    text: `Match from ${thisleg} is ${remainingDay}`,
  });
export default fixtureEmbedded.toJSON();
