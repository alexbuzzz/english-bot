const { Markup } = require('telegraf')

// Go keyboard
const goKeyboard = {
  parse_mode: 'HTML',
  ...Markup.inlineKeyboard([
    Markup.button.callback('START LEARNING ▶️', 'question'),
  ]),
}

// Main keyboard
const questionKeyboard = {
  parse_mode: 'HTML',
  ...Markup.inlineKeyboard([
    [Markup.button.callback('🟥', '1'), Markup.button.callback('🟦', '2')],
    [Markup.button.callback('🟨', '3'), Markup.button.callback('🟩', '4')],
  ]),
}

// Continue keyboard
const continueKeyboard = {
  parse_mode: 'HTML',
  ...Markup.inlineKeyboard([Markup.button.callback('Continue ➡️', 'question')]),
}

// Next level keyboard
const nextLevelKeyboard = {
  parse_mode: 'HTML',
  ...Markup.inlineKeyboard([
    Markup.button.callback('Go to next level ➡️', 'nextLevel'),
  ]),
}

// Play again keyboard
const playAgainKeyboard = {
  parse_mode: 'HTML',
  ...Markup.inlineKeyboard([
    Markup.button.callback('Play again ➡️', 'playAgain'),
  ]),
}

module.exports = {
  questionKeyboard,
  continueKeyboard,
  goKeyboard,
  nextLevelKeyboard,
  playAgainKeyboard,
}
