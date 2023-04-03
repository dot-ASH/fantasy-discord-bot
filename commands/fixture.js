import * as dotenv from "dotenv";
import { EmbedBuilder } from "discord.js";
import { QuarterLegOne, QuarterLegTwo, whichLeg } from "./reminder.js";
import { fixtureLegOne, fixtureLegTwo } from "./reminder.js";
import moment from "moment-timezone";

dotenv.config();
const siteUrl = "https://gaming.uefa.com/en/uclfantasy/overview";
const fixtureUrl =
  "https://www.uefa.com/uefachampionsleague/fixtures-results/#/rd/2001674-1";

let nextMatchday;
let thisleg = whichLeg();

if (thisleg === "Round 16 Leg One") {
  nextMatchday = fixtureLegOne[0].date;
} else if (thisleg === "Round 16 Leg Two") {
  nextMatchday = fixtureLegTwo[0].date;
}  else if (thisleg === "Quarter Final Leg One") {
  nextMatchday = QuarterLegOne[0].date;
} else if (thisleg === "Quarter Final Leg Two") {
  nextMatchday = QuarterLegTwo[0].date;
} else {
  nextMatchday = moment();
}
const remainingDay = moment(nextMatchday, "MMMM Do YYYY, h:mm:ss a").fromNow();

const fixtureEmbedded = new EmbedBuilder()
  .setTitle("Fixture")
  .setURL(fixtureUrl)
  .setAuthor({
    name: "Fantasy League Bot",
    iconURL: "https://i1.lensdump.com/i/17MRxo.jpg",
    url: siteUrl,
  })
  .setColor(0x5e548e)
  .setDescription("Round of 16")
  .addFields({
    name: `-----------------------------------------------------------`,
    value: "\u200b",
  })
  .addFields({
    name: `Fixture \t\t\t\t\t 1st leg`,
    value: "\u200b",
  })
  .addFields({
    name: `-----------------------------------------------------------`,
    value: "\u200b",
  });
fixtureLegOne.forEach((element) => {
  fixtureEmbedded.addFields({
    name: `${element.matchName} \t---\t ${element.date}`,
    value: "\u200b",
  });
});

fixtureEmbedded
  .addFields({
    name: `-----------------------------------------------------------`,
    value: "\u200b",
  })
  .addFields({
    name: `Fixture \t\t\t\t\t Second Leg`,
    value: "\u200b",
  })
  .addFields({
    name: `-----------------------------------------------------------`,
    value: "\u200b",
  });
fixtureLegTwo.forEach((element) => {
  fixtureEmbedded.addFields({
    name: `${element.matchName} \t---\t ${element.date}`,
    value: "\u200b",
  });
});
fixtureEmbedded
  .addFields({
    name: `-----------------------------------------------------------`,
    value: "\u200b",
  })
  .addFields({
    name: `Fixture \t\t\t\t\t Quarter Final Leg One`,
    value: "\u200b",
  })
  .addFields({
    name: `-----------------------------------------------------------`,
    value: "\u200b",
  });
QuarterLegOne.forEach((element) => {
  fixtureEmbedded.addFields({
    name: `${element.matchName} \t---\t ${element.date}`,
    value: "\u200b",
  });
});

fixtureEmbedded
  .addFields({
    name: `-----------------------------------------------------------`,
    value: "\u200b",
  })
  .addFields({
    name: `Fixture \t\t\t\t\t Quarter Final Second Leg`,
    value: "\u200b",
  })
  .addFields({
    name: `-----------------------------------------------------------`,
    value: "\u200b",
  });
QuarterLegTwo.forEach((element) => {
  fixtureEmbedded.addFields({
    name: `${element.matchName} \t---\t ${element.date}`,
    value: "\u200b",
  });
});

fixtureEmbedded
  .addFields({
    name: `-----------------------------------------------------------`,
    value: "\u200b",
  })
  .setFooter({
    text: `Match from ${thisleg} is ${remainingDay}`,
  });
export default fixtureEmbedded.toJSON();
