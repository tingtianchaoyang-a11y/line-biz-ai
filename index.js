const express = require("express");
const app = express();

// ★これが必須
app.use(express.json());

// 生存確認用
app.get("/", (req, res) => {
  res.status(200).send("ok");
});

// ★Webhook（最重要）
app.post("/webhook", (req, res) => {
  // LINEには即200を返す（処理は後回し）
  res.sendStatus(200);

  // 中身は今は何もしなくてOK
  console.log("Webhook received");
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("listening on", port);
});
