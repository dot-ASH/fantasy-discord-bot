import { SlashCommandBuilder } from "discord.js";
import { players } from "./players.js";

let choices=[];
for (let i = 0; i < players.length; i++) {
  choices.push( {
    name: players[i].teamName,
    value: players[i].teamName.replace(/\W/g, "").toLowerCase(),
  });
}


const fantasyCommand = new SlashCommandBuilder()
  .setName("fantasy")
  .setDescription("UCL Fantasy League")
  .addStringOption((option) =>
    option
      .setName("menu")
      .setDescription("Modules")
      .setRequired(false)
      .addChoices(
        { name: "Leaderborard", value: "leaderboard" },
        { name: "Fixture", value: "fixture" },
        { name: "Previous Result & MOTM", value: "motm" },
        { name: "Previous Winner :v", value: "prevWinner" }
      )
  )
  .addStringOption((option) =>
    option
      .setName("points")
      .setDescription("Modules")
      .setRequired(false)
      .addChoices(...choices)
  );

export default fantasyCommand.toJSON();
