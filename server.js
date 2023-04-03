import express from "express";
import axios from "axios";
import fs from "fs";
import bodyParser from "body-parser";
import * as dotenv from "dotenv";
import { sendLeaderboard, sendtxt, sendResult } from "./commands/sendtxt.js";

dotenv.config();

const server = express();
const hostname = "192.168.0.7";
const port = "3000";

server.set("view engine", "ejs");
server.use(express.static("public"));
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

const newLeaderboard = [];

// PUT DATA ON A JSON FILE
function createJSONfile(location, data) {
  fs.writeFile(location, JSON.stringify(data), function (err) {
    if (err) {
      return err;
    }
    console.log("The file was saved!");
  });
}

// FETCH THE LEAGUE DATA FROM API
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

server.get("/", (req, res) => {
  res.render("admin");
});

server.post("/mainpage", (req, res) => {
  const admin = {
    name: "admin",
    pass: "ad1234",
  };
  let username = req.body.username;
  let password = req.body.password;
  if (username === admin.name && password === admin.pass) {
    res.render("mainpage");
  } else res.render("admin");
});

// MAINPAGE
server.get("/mainpage", (req, res) => {
  res.render("mainpage");
});

server.post("/apiPost", (req, res) => {
  // let body = req.body;
  // console.log(body.apiLink);
  fetchLeaderboard();
  res.redirect("/");
});

// FIXTURE API
server.get("/fixture", (req, res) => {
  fs.readFile("./data/fixture.json", "utf8", function (err, contents) {
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
  res.redirect("mainpage");
});

server.post("/leaderboard", async (req, res) => {
  sendLeaderboard();
  res.redirect("mainpage");
});

server.post("/result", async (req, res) => {
  sendResult();
  res.redirect("mainpage");
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
