require('dotenv').config()
const JSONdb = require('simple-json-db')
const { resetLevel, score } = require('./public/scripts/init')
const createQuestion = require('./public/scripts/createQuestion')
const checkAnwer = require('./public/scripts/checkAnwer')
const {
  goKeyboard,
  questionKeyboard,
  continueKeyboard,
  nextLevelKeyboard,
  playAgainKeyboard,
} = require('./public/scripts/keyboards')

const { Telegraf } = require('telegraf')
const bot = new Telegraf(process.env.BOT_TOKEN)

// START
bot.command('start', async (ctx) => {
  await ctx.replyWithPhoto({
    source: './public/images/ava.jpg',
  })
  ctx.reply(
    "Hi! I'm here to help you learn English words faster! Let's get started!",
    goKeyboard
  )

  resetLevel(ctx)
  score(ctx)
})

// QUESTION
bot.action('question', async (ctx) => {
  const db = new JSONdb('./database/db.json')
  if (db.has(ctx.chat.id)) {
    const data = db.get(ctx.chat.id)
    if (Object.keys(data.questionsRemain).length > 0) {
      await ctx.editMessageText(createQuestion(ctx), questionKeyboard)
    } else {
      await ctx.editMessageText(
        'Congratulations! You have passed all the words in this level! 🎉🎉🎉',
        nextLevelKeyboard
      )
    }
  }
})

// 1
bot.action('1', (ctx) => {
  ctx.editMessageText(checkAnwer(ctx, 'a1'), continueKeyboard)
})

// 2
bot.action('2', (ctx) => {
  ctx.editMessageText(checkAnwer(ctx, 'a2'), continueKeyboard)
})

// 3
bot.action('3', (ctx) => {
  ctx.editMessageText(checkAnwer(ctx, 'a3'), continueKeyboard)
})

// 4
bot.action('4', (ctx) => {
  ctx.editMessageText(checkAnwer(ctx, 'a4'), continueKeyboard)
})

// Next level
bot.action('nextLevel', (ctx) => {
  if (score(ctx)) {
    ctx.editMessageText(createQuestion(ctx), questionKeyboard)
  } else {
    ctx.editMessageText(
      'YOU PASSED ALL LEVELS!!!\nI hate to admit it, but you are amazing! 💃🕺',
      playAgainKeyboard
    )
  }
})

// Play Again
bot.action('playAgain', (ctx) => {
  ctx.editMessageText("Okay! Let's go on our journey again!", goKeyboard)

  resetLevel(ctx)
  score(ctx)
})

bot.launch()
