import { config } from "dotenv";
import { client } from "../bot.js";
import { EmbedBuilder } from "discord.js";
import { readJson } from "../server.js";
import moment from "moment";
import "moment-timezone";

config();
const TIMEZONE = process.env.TIME_ZONE || "Asia/Dhaka";
const FANTASY_ROLE = process.env.ROLE || "";
const CHANNEL_ID = process.env.CHANNEL_ID;

let remainingDay;
const minOffset = 24;
const hourOffset = 21;
const subOffset = 1;
const tranOffset = 3;

let data = await readJson("./data/newFixture.json");
const [
  matchDayOne,
  matchDayTwo,
  matchDayThree,
  matchDayFour,
  matchDayFive,
  matchDaySix,
] = data;

export function localTime(cetTime) {
  const cetTimeZone = "Europe/Berlin";
  const parsedCETTime = moment.tz(cetTime, "MM/DD/YYYY HH:mm:ss", cetTimeZone);
  const bdtTime = parsedCETTime.clone().tz(TIMEZONE);
  return bdtTime;
}

export function cetTimeDate(matchday, element) {
  return matchday.matches[element].date;
}

export function dateFormate(date) {
  return moment(date, "MM/DD/YYYY HH:mm:ss").format("MMMM Do YYYY, h:mm:ss a");
}

let today = moment().tz(TIMEZONE);
let nextMatchday = matchDayOne.matches[0].date;

function subDays(num1, num2) {
  let result = Math.abs(num1 - num2);
  return result > 0 ? result : 1;
}

function compareDate(matchday) {
  const cetTime = cetTimeDate(matchday, matchday.matches.length - 1);
  const bdtTime = localTime(cetTime);
  if (
    today.month() < bdtTime.month() ||
    (today.month() === bdtTime.month() &&
      today.date() < bdtTime.date() &&
      today.date() > 0)
  ) {
    return true;
  } else return false;
}

export const matchDays = [
  matchDayOne,
  matchDayTwo,
  matchDayThree,
  matchDayFour,
  matchDayFive,
  matchDaySix,
];

export function whichMd() {
  for (let i = 0; i < matchDays.length; i++) {
    if (compareDate(matchDays[i])) {
      nextMatchday = matchDays[i].matches[0].date;
      return `Matchday ${i + 1}`;
    }
  }

  return "No match";
}

whichMd();
let thisLeg = whichMd();
console.log(thisLeg);
remainingDay = moment(
  dateFormate(localTime(nextMatchday)),
  "MMMM Do YYYY, h:mm:ss a"
).fromNow();
console.log(remainingDay);
console.log(dateFormate(localTime(nextMatchday)));

export async function reminder() {
  let today = moment().tz(TIMEZONE);
  console.log(today.date(), today.hour(), today.minute(), today.second());
  const Channel = client.channels.cache.find(
    (channel) => channel.id === CHANNEL_ID
  );

  async function sendTransferMatchReminder(matchDayIndex) {
    const matchDay = matchDays[matchDayIndex];
    const match = matchDay.matches[0];
    if (
      today.year() === localTime(match.date).year() &&
      today.month() === localTime(match.date).month() &&
      today.date() === subDays(localTime(cetTimeDate(matchDay, 0)).date(), tranOffset) &&
      today.hour() === hourOffset &&
      today.minute() === minOffset
    ) {
      const exampleEmbed = new EmbedBuilder()
        .setTitle(`${thisLeg} is ${remainingDay}`)
        .setColor(0x5e548e)
        .addFields({
          name: "\u200b",
          value: `The transfer window is open!`,
        })
        .addFields({
          name: `Be Prepared!`,
          value: "\u200b",
        });

      await Channel.send({
        content: `Hey <@&${FANTASY_ROLE}>`,
        embeds: [exampleEmbed],
      });
    }
  }

  async function sendSubMatchReminder(matchDayIndex) {
    const matchDay = matchDays[matchDayIndex];
    let isMentioned = false;
    for (let i = 0; i < matchDay.matches.length; i++) {
      if (
        today.year() === localTime(matchDay.matches[i].date).year() &&
        today.month() === localTime(matchDay.matches[i].date).month() &&
        today.date() === subDays(localTime(cetTimeDate(matchDay, i)).date(), subOffset) &&
        today.hour() === hourOffset &&
        today.minute() === minOffset
      ) {
        remainingDay = moment(
          dateFormate(localTime(matchDay.matches[i].date)),
          "MMMM Do YYYY, h:mm:ss a"
        ).fromNow();
        const exampleEmbed = new EmbedBuilder()
          .setTitle(`Matches is ${remainingDay}`)
          .setColor(0x5e548e)
          .addFields({
            name: "\u200b",
            value: `Sub/Transfer window is open!`,
          })
          .addFields({
            name: `${matchDay.matches[i].matchName}`,
            value: `at ${dateFormate(localTime(matchDay.matches[i].date))}`,
          });
        await Channel.send({
          content: isMentioned ? "" : `Hey <@&${FANTASY_ROLE}>`,
          embeds: [exampleEmbed],
        });
        isMentioned = true;
      }
    }
  }

  for (let i = 0; i < matchDays.length; i++) {
    sendTransferMatchReminder(i);
  }

  for (let i = 0; i < matchDays.length; i++) {
    sendSubMatchReminder(i);
  }
}
