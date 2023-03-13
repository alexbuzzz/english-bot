const JSONdb = require('simple-json-db')
const fs = require('fs')

const resetLevel = (ctx) => {
  const db = new JSONdb('./database/db.json')

  const user = {
    currentLevel: 0,
  }

  db.set(ctx.chat.id, user)
}

const score = (ctx) => {
  const db = new JSONdb('./database/db.json')

  if (db.has(ctx.chat.id)) {
    const data = db.get(ctx.chat.id)

    const user = {
      firstName: ctx.from.first_name,
      lastName: ctx.from.last_name || '',
      userName: ctx.from.username,
      currentLevel: data.currentLevel + 1,
      currentQuestion: '',
      questionsRemain: {},
    }

    const filePath = `./database/level${data.currentLevel + 1}.json`
    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath)
      const questions = JSON.parse(data)
      const length = Object.keys(questions).length
      for (let i = 1; i <= length; i++) {
        user.questionsRemain[`q${i}`] = 5
      }

      db.set(ctx.chat.id, user)

      return true
    } else {
      return false
    }
  }
}

module.exports = { resetLevel, score }
