const JSONdb = require('simple-json-db')
const fs = require('fs')

const checkAnwer = (ctx, answer) => {
  const db = new JSONdb('./database/db.json')
  let msg

  if (db.has(ctx.chat.id)) {
    const data = db.get(ctx.chat.id)
    const currentLevel = data.currentLevel
    const questions = JSON.parse(
      fs.readFileSync(`./database/level${currentLevel}.json`)
    )

    const questionKey = data.currentQuestion

    if (questions[questionKey][answer] == questions[questionKey].c) {
      if (data.questionsRemain[questionKey] > 1) {
        data.questionsRemain[questionKey]--
      } else {
        delete data.questionsRemain[questionKey]
      }

      const questionsTotal = Object.keys(questions).length
      let questionsLeft = 0

      Object.keys(data.questionsRemain).forEach((e) => {
        questionsLeft += data.questionsRemain[e]
      })

      msg = `✅ CORRECT!\n\n Level ${data.currentLevel} - ${
        questionsTotal * 5 - questionsLeft
      }/${questionsTotal * 5}`
    } else {
      msg = `❌ Wrong answer\n\n Correct answer is: ${questions[
        questionKey
      ].c.toUpperCase()}`
    }

    db.set(ctx.chat.id, data)
  }
  return msg
}

module.exports = checkAnwer
