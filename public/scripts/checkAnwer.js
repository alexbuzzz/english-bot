const JSONdb = require('simple-json-db')
const fs = require('fs')

const checkAnwer = (ctx, answer) => {
  const db = new JSONdb('./database/db.json')
  let msg

  if (db.has(ctx.chat.id)) {
    const data = db.get(ctx.chat.id)
    const questions = JSON.parse(fs.readFileSync('./database/questions.json'))

    const questionKey = data.currentQuestion

    if (questions[questionKey][answer] == questions[questionKey].c) {
      msg = `✅ CORRECT!\n\n${
        Object.keys(data.questionsRemain).length - 1
      } word(s) left`

      if (data.questionsRemain[questionKey] > 1) {
        data.questionsRemain[questionKey]--
      } else {
        delete data.questionsRemain[questionKey]
      }
    } else {
      msg = `❌ Wrong answer\n\n Correct answer is: ${questions[questionKey].c}`
    }

    db.set(ctx.chat.id, data)
  }
  return msg
}

module.exports = checkAnwer
