const JSONdb = require('simple-json-db')
const fs = require('fs')
const questions = JSON.parse(fs.readFileSync('./database/questions.json'))

const initScore = (ctx) => {
  const user = {
    firstName: ctx.from.first_name,
    lastName: ctx.from.last_name || '',
    userName: ctx.from.username,
    currentQuestion: '',
    questionsRemain: {},
  }

  const length = Object.keys(questions).length
  for (let i = 1; i <= length; i++) {
    user.questionsRemain[`q${i}`] = 12
  }

  const db = new JSONdb('./database/db.json')
  db.set(ctx.chat.id, user)
}

module.exports = initScore
