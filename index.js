const express = require("express");
const axios = require("axios");

const app = express();

// LINEのWebhookはJSONなので必要
app.use(express.json());

app.post("/webhook", async (req, res) => {
  // LINEには即200を返す（超重要）
  res.sendStatus(200);

  const events = req.body.events || [];

  for (const event of events) {
    if (event.type !== "message") continue;
    if (event.message.type !== "text") continue;

    const replyToken = event.replyToken;
    const userText = event.message.text;

    console.log("TEXT:", userText);

    await axios.post(
      "https://api.line.me/v2/bot/message/reply",
      {
        replyToken: replyToken,
        messages: [
          {
            type: "text",
            text: `【業務受付】\n内容：${userText}`
          }
        ]
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.LINE_ACCESS_TOKEN}`,
          "Content-Type": "application/json"
        }
      }
    );
  }
});

// Render用：PORTは必ずこれ
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running on", PORT);
});
// force redeploy
