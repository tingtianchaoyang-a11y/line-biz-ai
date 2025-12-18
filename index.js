const axios = require("axios");

app.post("/webhook", async (req, res) => {
  res.sendStatus(200);

  const events = req.body.events || [];

  for (const event of events) {
    if (event.type !== "message") continue;
    if (event.message.type !== "text") continue;

    const replyToken = event.replyToken;
    const userText = event.message.text;

    await axios.post(
      "https://api.line.me/v2/bot/message/reply",
      {
        replyToken: replyToken,
        messages: [
          {
            type: "text",
            text: `受け取りました：「${userText}」`,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.LINE_ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );
  }
});
