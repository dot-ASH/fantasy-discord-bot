import { config } from "dotenv";
import { client } from "../bot.js";
import { EmbedBuilder } from "discord.js";
import { readJson } from "../server.js";
import moment from "moment";

config();
let data;
let timezone = "Asia/Dhaka";
let remainingDay;

export let fixtureLegOne = [];
export let fixtureLegTwo = [];
export let QuarterLegOne = [];
export let QuarterLegTwo = [];
const minOffset = 1;
const hourOffset = 20;
const subOffset = 1;
const tranOffset = 3;
const fantasy_role = process.env.ROLE || "";
data = await readJson("./data/fixture.json");

function momentLocalFun(date) {
  return moment.tz(date, timezone).format("MMMM Do YYYY, h:mm:ss a");
}

data.legOne.forEach((element) => {
  fixtureLegOne.push({
    matchName: element.matchName,
    date: momentLocalFun(element.date),
  });
});

data.legTwo.forEach((element) => {
  fixtureLegTwo.push({
    matchName: element.matchName,
    date: momentLocalFun(element.date),
  });
});
data.qFlegOne.forEach((element) => {
  fixtureLegOne.push({
    matchName: element.matchName,
    date: momentLocalFun(element.date),
  });
});

data.qFlegTwo.forEach((element) => {
  fixtureLegTwo.push({
    matchName: element.matchName,
    date: momentLocalFun(element.date),
  });
});

const nextMatchday = fixtureLegOne[0].date;
function dateObj(date) {
  return moment(date, "MMMM Do YYYY, h:mm:ss a");
}

export function whichLeg() {
  let today = moment().tz(timezone);
  if (
    today.year() === dateObj(fixtureLegOne[7].date).year() &&
    today.month() === dateObj(fixtureLegOne[7].date).month() &&
    today.date() < dateObj(fixtureLegOne[7].date).date() &&
    today.date() > 1
  ) {
    return "Round 16 Leg One";
  } else if (
    today.year() === dateObj(fixtureLegTwo[7].date).year() &&
    today.month() === dateObj(fixtureLegTwo[7].date).month() &&
    today.date() < dateObj(fixtureLegTwo[7].date).date() &&
    today.date() > dateObj(fixtureLegOne[7].date).date()
  ) {
    return "Round 16 Leg Two";
  } else if (
    today.year() === dateObj(QuarterLegOne[7].date).year() &&
    today.month() === dateObj(QuarterLegOne[7].date).month() &&
    today.date() < dateObj(QuarterLegOne[7].date).date() &&
    today.date() > dateObj(QuarterLegOne[7].date).date()
  ) {
    return "Quarter Final Leg One";
  } else if (
    today.year() === dateObj(QuarterLegTwo[7].date).year() &&
    today.month() === dateObj(QuarterLegTwo[7].date).month() &&
    today.date() < dateObj(QuarterLegTwo[7].date).date() &&
    today.date() > dateObj(QuarterLegTwo[7].date).date()
  ) {
    return "Quarter Final Leg Two";
  }
}

export async function reminder() {
  let today = moment().tz(timezone);
  console.log(today.date(), today.hour(), today.minute(), today.second());

  // LEG ONE TRANSFER WINDOW
  if (
    today.year() === dateObj(fixtureLegOne[0].date).year() &&
    today.month() === dateObj(fixtureLegOne[0].date).month() &&
    today.date() === dateObj(fixtureLegOne[0].date).date() - tranOffset &&
    today.hour() === hourOffset &&
    today.minute() === minOffset
  ) {
    let thisLeg = whichLeg();
    remainingDay = moment(nextMatchday, "MMMM Do YYYY, h:mm:ss a").fromNow();
    const Channel = client.channels.cache.find(
      (channel) => channel.id === process.env.CHANNEL_ID
    );
    const exampleEmbed = new EmbedBuilder()
      .setTitle(`${thisLeg} is ${remainingDay}`)
      .setColor(0x5e548e)
      .addFields({
        name: "\u200b",
        value: `Make transfer, Be changed, fly high!`,
      })
      .addFields({
        name: `Be Prepared!`,
        value: "\u200b",
      })
      .addFields({
        name: `Next matches: ${fixtureLegOne[0].matchName}`,
        value: `at ${fixtureLegOne[0].date}`,
      })
      .addFields({
        name: `${fixtureLegOne[1].matchName}`,
        value: `at ${fixtureLegOne[1].date}`,
      });
    await Channel.send({
      content: `Hey ${fantasy_role}`,
      embeds: [exampleEmbed],
    });
  }
  // LEG TWO TRANSFER WINDOW
  if (
    today.year() === dateObj(fixtureLegTwo[0].date).year() &&
    today.month() === dateObj(fixtureLegTwo[0].date).month() &&
    today.date() === dateObj(fixtureLegTwo[0].date).date() - tranOffset &&
    today.hour() === hourOffset &&
    today.minute() === minOffset
  ) {
    let thisLeg = whichLeg();
    remainingDay = moment(nextMatchday, "MMMM Do YYYY, h:mm:ss a").fromNow();
    const Channel = client.channels.cache.find(
      (channel) => channel.id === process.env.CHANNEL_ID
    );
    const exampleEmbed = new EmbedBuilder()
      .setTitle(`${thisLeg} is ${remainingDay}`)
      .setColor(0x5e548e)
      .addFields({
        name: "\u200b",
        value: `Make transfer, Be changed, fly high!`,
      })
      .addFields({
        name: `Be Prepared!`,
        value: "\u200b",
      })
      .addFields({
        name: `Next matches: ${fixtureLegTwo[0].matchName}`,
        value: `at ${fixtureLegTwo[0].date}`,
      })
      .addFields({
        name: `${fixtureLegTwo[1].matchName}`,
        value: `at ${fixtureLegTwo[1].date}`,
      });
    await Channel.send({
      content: `Hey ${fantasy_role}`,
      embeds: [exampleEmbed],
    });
  }

  // Quarter LEG one TRANSFER WINDOW
  if (
    today.year() === dateObj(QuarterLegOne[0].date).year() &&
    today.month() === dateObj(QuarterLegOne[0].date).month() &&
    today.date() === dateObj(QuarterLegOne[0].date).date() - tranOffset &&
    today.hour() === hourOffset &&
    today.minute() === minOffset
  ) {
    let thisLeg = whichLeg();
    remainingDay = moment(nextMatchday, "MMMM Do YYYY, h:mm:ss a").fromNow();
    const Channel = client.channels.cache.find(
      (channel) => channel.id === process.env.CHANNEL_ID
    );
    const exampleEmbed = new EmbedBuilder()
      .setTitle(`${thisLeg} is ${remainingDay}`)
      .setColor(0x5e548e)
      .addFields({
        name: "\u200b",
        value: `Make transfer, Be changed, fly high!`,
      })
      .addFields({
        name: `Be Prepared!`,
        value: "\u200b",
      })
      .addFields({
        name: `Next matches: ${QuarterLegOne[0].matchName}`,
        value: `at ${QuarterLegOne[0].date}`,
      })
      .addFields({
        name: `${QuarterLegOne[1].matchName}`,
        value: `at ${QuarterLegOne[1].date}`,
      });
    await Channel.send({
      content: `Hey ${fantasy_role}`,
      embeds: [exampleEmbed],
    });
  }
  // Quarter LEG two TRANSFER WINDOW
  if (
    today.year() === dateObj(QuarterLegTwo[0].date).year() &&
    today.month() === dateObj(QuarterLegTwo[0].date).month() &&
    today.date() === dateObj(QuarterLegTwo[0].date).date() - tranOffset &&
    today.hour() === hourOffset &&
    today.minute() === minOffset
  ) {
    let thisLeg = whichLeg();
    remainingDay = moment(nextMatchday, "MMMM Do YYYY, h:mm:ss a").fromNow();
    const Channel = client.channels.cache.find(
      (channel) => channel.id === process.env.CHANNEL_ID
    );
    const exampleEmbed = new EmbedBuilder()
      .setTitle(`${thisLeg} is ${remainingDay}`)
      .setColor(0x5e548e)
      .addFields({
        name: "\u200b",
        value: `Make transfer, Be changed, fly high!`,
      })
      .addFields({
        name: `Be Prepared!`,
        value: "\u200b",
      })
      .addFields({
        name: `Next matches: ${QuarterLegTwo[0].matchName}`,
        value: `at ${QuarterLegTwo[0].date}`,
      })
      .addFields({
        name: `${QuarterLegTwo[1].matchName}`,
        value: `at ${QuarterLegTwo[1].date}`,
      });
    await Channel.send({
      content: `Hey ${fantasy_role}`,
      embeds: [exampleEmbed],
    });
  }

  // LEG ONE SUB WINDOW
  for (let i = 0; i < fixtureLegOne.length; i++) {
    if (
      today.year() === dateObj(fixtureLegOne[i].date).year() &&
      today.month() === dateObj(fixtureLegOne[i].date).month() &&
      today.date() === dateObj(fixtureLegOne[i].date).date() - subOffset &&
      today.hour() === hourOffset &&
      today.minute() === minOffset
    ) {
      let thisLeg = whichLeg();
      const nextMatchday = fixtureLegOne[i].date;
      remainingDay = moment(nextMatchday, "MMMM Do YYYY, h:mm:ss a").fromNow();
      const Channel = client.channels.cache.find(
        (channel) => channel.id === process.env.CHANNEL_ID
      );
      const exampleEmbed = new EmbedBuilder()
        .setTitle(`${thisLeg} is ${remainingDay}`)
        .setColor(0x5e548e)
        .addFields({
          name: "\u200b",
          value: `Sub/Transfer window is open!`,
        })
        .addFields({
          name: `Make sure you check that out!`,
          value: "\u200b",
        })
        .addFields({
          name: `Next match: ${fixtureLegOne[i].matchName}`,
          value: `at ${fixtureLegOne[i].date}`,
        });
      await Channel.send({
        content: `Hey ${fantasy_role}`,
        embeds: [exampleEmbed],
      });
    }
  }
  // LEG TWO SUB WINDOW
  for (let i = 0; i < fixtureLegTwo.length; i++) {
    if (
      today.year() === dateObj(fixtureLegTwo[i].date).year() &&
      today.month() === dateObj(fixtureLegTwo[i].date).month() &&
      today.date() === dateObj(fixtureLegTwo[i].date).date() - subOffset &&
      today.hour() === hourOffset &&
      today.minute() === minOffset
    ) {
      let thisLeg = whichLeg();
      const nextMatchday = fixtureLegTwo[i].date;
      remainingDay = moment(nextMatchday, "MMMM Do YYYY, h:mm:ss a").fromNow();
      const Channel = client.channels.cache.find(
        (channel) => channel.id === process.env.CHANNEL_ID
      );
      const exampleEmbed = new EmbedBuilder()
        .setTitle(`${thisLeg} is ${remainingDay}`)
        .setColor(0x5e548e)
        .addFields({
          name: "\u200b",
          value: `Sub/Transfer window is open!`,
        })
        .addFields({
          name: `Make sure you check that out!`,
          value: "\u200b",
        })
        .addFields({
          name: `Next match: ${fixtureLegTwo[i].matchName}`,
          value: `at ${fixtureLegTwo[i].date}`,
        });
      await Channel.send({
        content: `Hey ${fantasy_role}`,
        embeds: [exampleEmbed],
      });
    }
  }
  // Q LEG 1 SUB WINDOW
  for (let i = 0; i < QuarterLegOne.length; i++) {
    if (
      today.year() === dateObj(QuarterLegOne[i].date).year() &&
      today.month() === dateObj(QuarterLegOne[i].date).month() &&
      today.date() === dateObj(QuarterLegOne[i].date).date() - subOffset &&
      today.hour() === hourOffset &&
      today.minute() === minOffset
    ) {
      let thisLeg = whichLeg();
      const nextMatchday = QuarterLegOne[i].date;
      remainingDay = moment(nextMatchday, "MMMM Do YYYY, h:mm:ss a").fromNow();
      const Channel = client.channels.cache.find(
        (channel) => channel.id === process.env.CHANNEL_ID
      );
      const exampleEmbed = new EmbedBuilder()
        .setTitle(`${thisLeg} is ${remainingDay}`)
        .setColor(0x5e548e)
        .addFields({
          name: "\u200b",
          value: `Sub/Transfer window is open!`,
        })
        .addFields({
          name: `Make sure you check that out!`,
          value: "\u200b",
        })
        .addFields({
          name: `Next match: ${QuarterLegOne[i].matchName}`,
          value: `at ${QuarterLegOne[i].date}`,
        });
      await Channel.send({
        content: `Hey ${fantasy_role}`,
        embeds: [exampleEmbed],
      });
    }
  }
  // Q LEG 2 SUB WINDOW
  for (let i = 0; i < QuarterLegTwo.length; i++) {
    if (
      today.year() === dateObj(QuarterLegTwo[i].date).year() &&
      today.month() === dateObj(QuarterLegTwo[i].date).month() &&
      today.date() === dateObj(QuarterLegTwo[i].date).date() - subOffset &&
      today.hour() === hourOffset &&
      today.minute() === minOffset
    ) {
      let thisLeg = whichLeg();
      const nextMatchday = QuarterLegTwo[i].date;
      remainingDay = moment(nextMatchday, "MMMM Do YYYY, h:mm:ss a").fromNow();
      const Channel = client.channels.cache.find(
        (channel) => channel.id === process.env.CHANNEL_ID
      );
      const exampleEmbed = new EmbedBuilder()
        .setTitle(`${thisLeg} is ${remainingDay}`)
        .setColor(0x5e548e)
        .addFields({
          name: "\u200b",
          value: `Sub/Transfer window is open!`,
        })
        .addFields({
          name: `Make sure you check that out!`,
          value: "\u200b",
        })
        .addFields({
          name: `Next match: ${QuarterLegTwo[i].matchName}`,
          value: `at ${QuarterLegTwo[i].date}`,
        });
      await Channel.send({
        content: `Hey ${fantasy_role}`,
        embeds: [exampleEmbed],
      });
    }
  }
}
