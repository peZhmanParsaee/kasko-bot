const Bot = require("./bot");
require("dotenv").config();

const bot = new Bot();

const { TELEGRAM_BOT_TOKEN } = process.env;

bot.init(TELEGRAM_BOT_TOKEN).then(() => {
  bot.introduceYourself();
});

bot.on("message", () => {
  const chatId = 123;

  bot.sendMessage(chatId, "Hey");
});

bot
  .getUpdates()
  .then((updates) => {
    if (updates) {
      for (let i = 0; i < updates.length; i++) {
        console.log(updates[i].message);
        bot
          .sendMessage(updates[i].message.chat.id, "answer to you")
          .then((result) => {
            console.log(result);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    } else {
      console.log("there are no updates");
    }
  })
  .catch((err) => {
    console.error("error in get updates", err);
  });
