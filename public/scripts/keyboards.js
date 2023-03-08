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

// Try again keyboard
const tryAgainKeyboard = {
  parse_mode: 'HTML',
  ...Markup.inlineKeyboard([
    Markup.button.callback('Try again ➡️', 'tryAgain'),
  ]),
}

module.exports = {
  questionKeyboard,
  continueKeyboard,
  goKeyboard,
  tryAgainKeyboard,
}
