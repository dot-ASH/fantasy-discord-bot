import leaderBoardEmbed, { players } from "../commands/players.js";
import * as dotenv from "dotenv";
dotenv.config();

import { AttachmentBuilder, EmbedBuilder } from "discord.js";
import fixtureEmbedded from "../commands/fixture.js";
import moment from "moment";
import "moment-timezone";

let nowYear = moment().tz("Asia/Dhaka").year();
let prevYear = nowYear - 1;

let choices = [];
for (let i = 0; i < players.length; i++) {
  choices.push({
    name: players[i].teamName,
    value: players[i].teamName.replace(/\W/g, "").toLowerCase(),
    points: players[i].overallPoints,
  });
}

export const leaderboard = {
  name: "interactionCreate",
  async execute(interaction) {
    try {
      if (
        interaction.isChatInputCommand &&
        interaction.options.get("menu") !== null
      ) {
        if (interaction.options.get("menu").value === "leaderboard") {
          interaction.reply({
            embeds: [leaderBoardEmbed],
          });
        }
      }
    } catch (error) {
      console.log(error);
      interaction.reply({
        content: `Server is busy.... try again after few min`,
        ephemeral: true,
      });
    }
  },
};

export const score = {
  name: "interactionCreate",
  async execute(interaction) {
    try {
      if (
        interaction.isChatInputCommand &&
        (await interaction.options.get("points")) !== null
      ) {
        var username = await interaction.options.get("points").value;
        choices.forEach((element) => {
          if (element.value === username) {
            console.log(element.points);
            interaction.reply({
              content: element.points,
              ephemeral: true,
            });
          }
        });
      }
    } catch (error) {
      console.log(error);
      interaction.reply({
        content: `Server is busy.... try again after few min`,
        ephemeral: true,
      });
    }
  },
};

export const fixtureMenu = {
  name: "interactionCreate",
  async execute(interaction) {
    try {
      if (
        interaction.isChatInputCommand &&
        interaction.options.get("menu") !== null
      ) {
        if (interaction.options.get("menu").value === "fixture") {
          interaction.reply({
            embeds: [fixtureEmbedded],
          });
        }
      }
    } catch (error) {
      console.log(error);
      interaction.reply({
        content: `Server is busy.... try again after few min`,
        ephemeral: true,
      });
    }
  },
};

export const prevWinner = {
  name: "interactionCreate",
  async execute(interaction) {
    try {
      if (
        interaction.isChatInputCommand &&
        interaction.options.get("menu") !== null
      ) {
        if (interaction.options.get("menu").value === "prevWinner") {
          const exampleEmbed = new EmbedBuilder()
            .setTitle(`Winner of ${prevYear}`)
            .setImage(process.env.WINNER_IMAGE_URL)
            .setColor(0x5e548e)
            .setAuthor({
              name: "Fantasy League Bot",
              iconURL: "https://i1.lensdump.com/i/17MRxo.jpg",
              url: "https://gaming.uefa.com/en/uclfantasy/overview",
            })
            .setFooter({
              text: process.env.WINNER_TEAM_NAME,
              iconURL: "https://i2.lensdump.com/i/1nEvWD.gif",
            });
          await interaction.reply({
            embeds: [exampleEmbed],
          });
        }
      }
    } catch (error) {
      console.log(error);
      interaction.reply({
        content: `Server is busy.... try again after few min`,
        ephemeral: true,
      });
    }
  },
};

export const aboutInt = {
  name: "interactionCreate",
  async execute(interaction) {
    try {
      if (interaction.isChatInputCommand) {
        if (interaction.commandName === "about") {
          const exampleEmbed = new EmbedBuilder()
            .setTitle(`Introducing Fantasy Bot`)
            .setDescription("This is Cool People Fantasy League Bot. Type")
            .setColor(0x5e548e)
            .setAuthor({
              name: "Fantasy League Bot",
              iconURL: "https://i1.lensdump.com/i/17MRxo.jpg",
              url: "https://gaming.uefa.com/en/uclfantasy/overview",
            })
            .addFields({ name: `/fantasy`, value: ";to see the modules" })
            .addFields({
              name: `fantasy > menu > leaderboard`,
              value: ";to see the leaderboard",
            })
            .addFields({
              name: `/fantasy > menu > Next Matches`,
              value: ";to see the next matchday fixture ",
            })
            .addFields({
              name: `/fantasy > menu >  Previous match day results`,
              value: ";to see the results of previous match",
            })
            .addFields({
              name: `/fantasy > menu > Previous winner ;`,
              value: "to see the winner of last fantasy league",
            })
            .addFields({
              name: `/fantasy  > points > `,
              value: ";to see your points which is only for your eyes. ",
            });
          await interaction.reply({
            embeds: [exampleEmbed],
          });
        }
      }
    } catch (error) {
      console.log(error);
      interaction.reply({
        content: `Server is busy.... try again after few min`,
        ephemeral: true,
      });
    }
  },
};
