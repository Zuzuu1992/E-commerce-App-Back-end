import express from "express";
import { createTable } from "./config/sql.js";

const app = express();

async function init() {
  try {
    await createTable();
    startServer();
  } catch (error) {
    console.log(error);
  }

  function startServer() {
    app.get("/", (req, res) => {
      return res.status(200).json({ message: "App works!" });
    });
    app.listen(3000);
  }
}

init();
