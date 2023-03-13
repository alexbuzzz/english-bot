const JSONdb = require('simple-json-db')
const fs = require('fs')

const createQuestion = (ctx) => {
  const db = new JSONdb('./database/db.json')

  if (db.has(ctx.chat.id)) {
    const data = db.get(ctx.chat.id)
    const currentLevel = data.currentLevel
    const questions = JSON.parse(
      fs.readFileSync(`./database/level${currentLevel}.json`)
    )

    const keysArray = Object.keys(data.questionsRemain)
    const randomIndex = Math.floor(Math.random() * keysArray.length)
    const randomKey = keysArray[randomIndex]

    data.currentQuestion = randomKey
    db.set(ctx.chat.id, data)

    let q =
      questions[randomKey].q.charAt(0).toUpperCase() +
      questions[randomKey].q.slice(1).toLowerCase()
    let a1 =
      questions[randomKey].a1.charAt(0).toUpperCase() +
      questions[randomKey].a1.slice(1).toLowerCase()
    let a2 =
      questions[randomKey].a2.charAt(0).toUpperCase() +
      questions[randomKey].a2.slice(1).toLowerCase()
    let a3 =
      questions[randomKey].a3.charAt(0).toUpperCase() +
      questions[randomKey].a3.slice(1).toLowerCase()
    let a4 =
      questions[randomKey].a4.charAt(0).toUpperCase() +
      questions[randomKey].a4.slice(1).toLowerCase()

    return `Choose the correct answer:\n\n${q}❔\n\n🔴  ${a1}\n\n🔵  ${a2}\n\n🟡  ${a3}\n\n🟢  ${a4}`
  } else {
    console.log('No chat ID in database!')
  }
}

module.exports = createQuestion
