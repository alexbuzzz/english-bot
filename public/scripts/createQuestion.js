const JSONdb = require('simple-json-db')
const fs = require('fs')

const createQuestion = (ctx) => {
  const db = new JSONdb('./database/db.json')

  if (db.has(ctx.chat.id)) {
    const data = db.get(ctx.chat.id)
    const questions = JSON.parse(fs.readFileSync('./database/questions.json'))

    const keysArray = Object.keys(data.questionsRemain)
    const randomIndex = Math.floor(Math.random() * keysArray.length)
    const randomKey = keysArray[randomIndex]

    data.currentQuestion = randomKey
    db.set(ctx.chat.id, data)
    console.log(randomKey)

    return `Choose the correct answer:\n\n${questions[
      randomKey
    ].q.toUpperCase()}❔\n\n🔴  ${questions[
      randomKey
    ].a1.toUpperCase()}\n\n🔵  ${questions[
      randomKey
    ].a2.toUpperCase()}\n\n🟡  ${questions[
      randomKey
    ].a3.toUpperCase()}\n\n🟢  ${questions[randomKey].a4.toUpperCase()}`
  } else {
    console.log('No chat ID in database!')
  }
}

module.exports = createQuestion
