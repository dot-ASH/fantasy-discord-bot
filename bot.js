import keepAlive from "./server.js"
keepAlive();
import { config } from "dotenv";
import {
  Client,
  GatewayIntentBits,
  Routes,
  REST,
  SlashCommandBuilder,
} from "discord.js";
import FanstayCommand from "./commands/fantasy.js";
import {
  leaderboard,
    score,
    fixtureMenu,
    motm,
    aboutInt,
    prevWinner
} from "./interactions/interactionCom.js";
// import { timer } from "./commands/commands/reminder.js.js";


/*
SYSTEM
*/

config();

const token = process.env.TOKEN;
const client_id = process.env.CLIENT_ID;
const guild_id = process.env.GUILD_ID;
const rest = new REST({ version: "10" }).setToken(token);
const about = new SlashCommandBuilder()
  .setName("about")
  .setDescription("About fantasy bot")
  .toJSON();

export const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.on("ready", () => {
  console.log(`Logged in as THE ${client.user.tag}!`);
//   setInterval(timer, 60000);

  client.user.setPresence({
    activities: [
      {
        name: "my code",
        type: "WATCHING",
      },
    ],
    status: "idle",
  });
});

(async () => {
  const commands = [FanstayCommand, about];
  try {
    console.log("Started refreshing application (/) commands.");
    await rest.put(Routes.applicationGuildCommands(client_id, guild_id), {
      body: commands,
    });
    await client.login(token);
  } catch (error) {
    console.log(error);
  }
})();

/*
INTERACTIONS
*/

client.on(leaderboard.name, leaderboard.execute);
client.on(score.name, score.execute);
client.on(fixtureMenu.name, fixtureMenu.execute);
client.on(motm.name, motm.execute);
client.on(prevWinner.name, prevWinner.execute);
client.on(aboutInt.name, aboutInt.execute);
