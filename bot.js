const express = require('express');
const { Telegraf, Markup } = require('telegraf');
const axios = require('axios');

require('dotenv').config();


const app = express();


const bot = new Telegraf(process.env.botToken);

// Use a stack to keep track of menu options
const menuStack = [];
const initialMenu = Markup.keyboard([
  ['Class Notes', 'Semester previous Question Paper'],
  ['Tell me a joke'],
]).resize();

// Handle the /start command
bot.command('start', (ctx) => {
  const initialMenu = Markup.keyboard([
    ['Class Notes', 'Semester previous Question Paper'],
    ['Tell me a joke'],
  ]).resize();

  const description = `1. Type /start to start the bot
  2. This bot will provide you relevant notes of IIIT Ranchi.
  3. This bot is under Progress.
  4. This bot is created by @aialok using node.js
  5. This bot is open source you can contribute it to.
  6. Happy Learning : )`;
  ctx.reply(description);
  menuStack.push(initialMenu);
  ctx.reply('Choose an option:', initialMenu);
});

// Handle menu option clicks
bot.hears('Class Notes', (ctx) => {
  const classNotesMenu = Markup.keyboard([
    ['Semester 1', 'Semester 2'],
    ['Back', 'Tell me a joke'],
  ]).resize();

  menuStack.push(classNotesMenu);
  ctx.reply('Choose an option:', classNotesMenu);
});

bot.hears('Semester 1', (ctx) => {
  const semester1Menu = Markup.keyboard([
    ['Physics', 'Maths', 'Electrical Techonlogy', 'Back'],
  ]).resize();

  menuStack.push(semester1Menu);
  ctx.reply('Choose an option:', semester1Menu);
});

bot.hears('Back', (ctx) => {
  menuStack.pop(); // Pop the current menu off the stack
  const previousMenu = menuStack[menuStack.length - 1];
  if (previousMenu) {
    ctx.reply('Choose an option:', previousMenu);
  } else {
    ctx.reply('Main menu:', initialMenu);
  }

});

bot.hears('Physics', (ctx) => {
  // Handle Physics selection
  let filePath = "https://drive.google.com/drive/folders/14tKn5X-aw21WkezeDicRPVznkURwAtYZ";
  ctx.reply("Your Physics notes is here enjoy : )");
  ctx.reply(filePath);
});

bot.hears('Maths', (ctx) => {
  // Handle Maths selection
  ctx.reply("Your Maths notes is here enjoy : )");
  let filePath = "https://drive.google.com/drive/folders/1ubun1qtNah1eGQcX87O5GLZMwAS83gWH";
  ctx.reply(filePath);
});

bot.hears('Electrical Techonlogy', (ctx) => {
  // Handle Electrical Techonlogy selection
  ctx.reply('Your Electrical Techonlogy notes is here enjoy : )');
  let filePath = "https://drive.google.com/drive/folders/1QqvlalYta3_9AQt9hxG1x-E6fMXtvxLt";
  ctx.reply(filePath);
});

bot.hears('Tell me a joke', (ctx) => {
  // Handle Exit option
  async function joke() {
    const response = await axios.get("https://official-joke-api.appspot.com/random_joke");
    ctx.reply(response.data.setup);
    setTimeout(() => {
      ctx.reply(response.data.punchline);
    }, 1000);


  }
  joke();

});


bot.hears('Semester previous Question Paper', (ctx) => {
  const pyqMenu = Markup.keyboard([[`semester 1 PYQ's`, `semester 2 PYQ's`, `semester 3 PYQ's`, 'Back']

  ]).resize();

  menuStack.push(pyqMenu);
  ctx.reply('Choose an option:', pyqMenu);
})

bot.hears(`semester 1 PYQ's`, (ctx) => {
  ctx.reply("Download your question paper")
  ctx.reply("https://drive.google.com/drive/folders/1PDdb3hWDHFDRMss5LDvZJhDE0f7xOeJ1");
})
bot.hears(`semester 2 PYQ's`, (ctx) => {
  ctx.reply("Download your question Paper");
  ctx.reply("https://drive.google.com/drive/folders/1d7wlmQLtZ4rM86J00LPxOuSxG6XiWEcN")
})

bot.hears(`semester 3 PYQ's`, (ctx) => {
  ctx.reply("Download Your Question Paper");
  ctx.reply("https://drive.google.com/drive/folders/1C7jWyksFphNyKhbP9GlPvcX05GSu1er2");
})

bot.hears("Semester 2", (ctx) => {
  ctx.reply("Coming Soon....");
})



// Start the web server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Web server is running on port ${port}`);
});



// Start the bot
bot.launch();
