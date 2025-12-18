const express = require("express");
const app = express();

app.use(express.json());

app.get("/", (req, res) => res.send("ok"));
app.post("/webhook", (req, res) => res.sendStatus(200));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log("listening on", port));
