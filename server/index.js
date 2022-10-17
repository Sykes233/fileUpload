const express = require("express");
const multer = require("multer");
const fs = require("fs");
const dayjs = require("dayjs");
const path = require("path");
const app = express();
const dir = "./upload";

async function getFileObj(file) {
  return new Promise((resolve, reject) => {
    let oneFile = {};
    fs.stat(path.join(dir, file), (err, stats) => {
      if (err) {
        reject(err);
      }
      oneFile.date = dayjs(stats.birthtime).format("YYYY-MM-DD HH:mm:ss");
      oneFile.filename = file;
      resolve(oneFile);
    });
  });
}

app.all("*", function (req, res, next) {
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({
  fileFilter(req, file, callback) {
    file.originalname = Buffer.from(file.originalname, "latin1").toString(
      "utf8"
    );
    callback(null, true);
  },
  storage: storage,
}).single("file");

app.post("/upload", async (req, res, next) => {
  upload(req, res, async (err) => {
    if (err) {
      console.log(err);
    } else {
      res.end("success");
    }
  });
});

app.get("/fileList", async (req, res) => {
  fs.readdir(dir, async (err, files) => {
    if (err) {
      return res.end(err);
    }
    let fileArr = [];
    for (let i = 0; i < files.length; i++) {
      try {
        let value = await getFileObj(files[i]);
        fileArr.push(value);
      } catch (error) {
        console.log("fileStat:", error);
      }
    }
    let resObj = {};
    resObj.result = fileArr;
    return res.end(JSON.stringify(resObj));
  });
});

module.exports = app;
