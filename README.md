*A discord bot built with Discord.js for UEFA CHAMPIONS LEAGUE FANTASY*

### Features
---

- Responds to discord slash command.
- Reminders before every match-day and matches.
- Reminders for sub/transfer player.
- and more..

### Development
---
- Clone the repo.
```bash
git clone https://github.com/dot-ASH/fantasy-discord-bot.git && cd fantasy-discord-bot
```
- Install npm packages
```bash
npm install 
```
- Create and configure the environment
```bash
touch .env
```
- Edit the .env file with these attributes:-
```plaintext
ADMIN= server-username
PASS= server-password
LEAGUE_URL= your-league-url
TOKEN= your-discord-bot-token
CLIENT_ID= your-discord-bot-id
GUILD_ID= your-server-id
CHANNEL_ID= your-channel-id
NODE_VERSION= 18.14.0
ROLE= id-of-role-to-mention
TIME_ZONE= your-timezone e.g. Asia/Dhaka
WINNER_NAME= "previous winner name" or ""
WINNER_TEAM_NAME= "previous winner name" or ""
WINNER_IMAGE_URL= image-url-of-the-winner
```
- Run the bot
```bash
npm run div
```
- Fetch the date
	- Open browser <http://localhost:3000/> login with the username password you set inside .env file (default: admin, 12345).
	- Click on `fetch Fixture` then `simplify Fixture` to get the latest fixture.
	- Provide your leagues API JOSN file link and press `fetch leaderboard` and then `simplify  leaderboard` to get the latest leaderboard
	- Other send options are self-explanatory.
- Have Fun.
### Usage
---

`/fantasy` to see the main menu. <br/>
`/about to` learn more.  <br/>
 <br/>
<img src="/Assets/disbot.gif" width="400"/>

