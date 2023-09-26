import express from "express";
import axios from "axios";
import fs from "fs";
import bodyParser from "body-parser";
import * as dotenv from "dotenv";
import {
  sendLeaderboard,
  sendtxt,
  sendFixture,
  sendWinner,
  sendThnx,
} from "./commands/sendtxt.js";

dotenv.config();

const server = express();
const hostname = "192.168.0.7";
const port = "3000";

server.set("view engine", "ejs");
server.use(express.static("public"));
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

const newLeaderboard = [];
const newFixture = [];

function addObjectToArray(name, numElements, array) {
  const newObject = {
    matchDay: name,
    matches: [],
  };
  for (let j = 0; j < numElements; j++) {
    newObject.matches.push({
      matchId: array[j].mId,
      matchName: `${array[j].htName} vs ${array[j].atName} `,
      date: array[j].dateTime,
    });
  }

  newFixture.push(newObject);
}

// PUT DATA ON A JSON FILE
function createJSONfile(location, data) {
  fs.writeFile(location, JSON.stringify(data), function (err) {
    if (err) {
      return err;
    }
    console.log("The file was saved!");
  });
}

// FETCH THE LEAG UE DATA FROM API
async function fetchLeaderboard() {
  fs.readFile("./data/leaderBoard.json", "utf8", function (err, contents) {
    if (err) {
      console.log(err);
    }
    let data = JSON.parse(contents);
    for (let i = 0; i < data.data.value.notation; i++) {
      newLeaderboard[i] = {
        teamName: data.data.value.rest[i].teamName,
        overallPoints: data.data.value.rest[i].overallPoints,
        currentGamedayPoints: data.data.value.rest[i].currentGamedayPoints,
      };
    }
    createJSONfile("./data/newleaderboard.json", newLeaderboard);
  });
}

async function fetchFixture() {
  const apiUrl =
    "https://gaming.uefa.com/en/uclfantasy/services/feeds/fixtures/fixtures_60_en.json";
  const filePath = "./data/fixture.json";

  downloadJSON(apiUrl, filePath);
}

async function fetchOldLeaderboard(url) {
  const apiUrl = url;
  const filePath = "./data/leaderBoard.json";

  downloadJSON(apiUrl, filePath);
}

// FETCH THE LEAG UE DATA FROM API
async function simplifyFixture() {
  fs.readFile("./data/fixture.json", "utf8", function (err, contents) {
    if (err) {
      console.log(err);
    }
    let data = JSON.parse(contents);
    console.log(data.data.value.length);
    for (let i = 0; i < data.data.value.length; i++) {
      addObjectToArray(
        data.data.value[i].mdId,
        data.data.value[i].match.length,
        data.data.value[i].match
      );
    }
    createJSONfile("./data/newFixture.json", newFixture);
  });
}

server.get("/", (req, res) => {
  res.render("admin");
});

server.post("/mainpage", (req, res) => {
  const admin = {
    name: process.env.ADMIN || "admin",
    pass: process.env.PASS || "12345",
  };
  let username = req.body.username;
  let password = req.body.password;
  if (username === admin.name && password === admin.pass) {
    res.render("mainpage");
  } else res.render("admin");
});

// MAINPAGE
server.get("/mainpage", (req, res) => {
  res.redirect("/");
});

server.post("/apiOldPost", (req, res) => {
  let url = req.body.url;
  console.log(url)
    downloadJSON(url, "./data/leaderBoard.json");
    res.render("mainpage")
  // fetchOldLeaderboard(url);
});

server.post("/apiPost", (req, res) => {
  fetchLeaderboard();
  res.render("mainpage")
});

server.post("/apiFixture", (req, res) => {
  fetchFixture();
  res.render("mainpage")
});

server.post("/apiPostFixture", (req, res) => {
  simplifyFixture();
  res.render("mainpage")
});

// FIXTURE API
server.get("/fixture", (req, res) => {
  fs.readFile("./data/newFixture.json", "utf8", function (err, contents) {
    if (err) {
      console.log(err);
    }
    res.send(JSON.parse(contents));
  });
});

// LEADERBOARD API
server.get("/ourFantasy", async (req, res) => {
  fs.readFile("./data/newleaderboard.json", "utf8", function (err, contents) {
    if (err) {
      console.log(err);
    }
    res.json(JSON.parse(contents));
  });
});

// SEND MESSAGES
server.post("/txt", async (req, res) => {
  let text = req.body.text;
  console.log(text);
  sendtxt(text);
  res.render("mainpage")
});

server.post("/leaderboard", async (req, res) => {
  sendLeaderboard();
  res.render("mainpage")
});

server.post("/sendFixture", async (req, res) => {
  sendFixture();
  res.render("mainpage")
});

export default function keepAlive() {
  server.listen(3000, () => {
    console.log(`Server is ready`);
  });
}

export async function readJson(location) {
  return new Promise((callback, reject) => {
    fs.readFile(location, "utf8", function (err, contents) {
      if (err) {
        console.log(err);
        reject(err);
      }
      callback(JSON.parse(contents));
    });
  });
}

async function downloadJSON(url, filePath) {
  try {
    const response = await axios.get(url);
    const jsonContent = JSON.stringify(response.data, null, 2);
    fs.writeFileSync(filePath, jsonContent);
    console.log("JSON data downloaded and saved to", filePath);
  } catch (error) {
    console.error("The link you provided is old or broken");
  }
}
