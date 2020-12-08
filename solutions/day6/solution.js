const path = require('path')
const { read, position } = require('promise-path')
const fromHere = position(__dirname)
const report = (...messages) => console.log(`[${require(fromHere('../../package.json')).logName} / ${__dirname.split(path.sep).pop()}]`, ...messages)

async function run () {
  const input = (await read(fromHere('input.txt'), 'utf8')).trim()

  await solveForFirstStar(input)
  await solveForSecondStar(input)
}

async function solveForFirstStar (input) {
  const questionInput = input.split('\n\n')

  let solution01Count = 0

  questionInput.forEach(function (item) {
    const group = {}
    group.answers = item.replace(/\n/g, ' ').split(' ')
    const allAnswers = group.answers.join('').split('')

    const answerSet = new Set(allAnswers)
    const answerArray = Array.from(answerSet)

    group.uniqueAnswerCount = answerArray.length
    solution01Count = solution01Count + group.uniqueAnswerCount

    return group
  })

  report('Solution 1:', solution01Count)
}

async function solveForSecondStar (input) {
  const questionInput = input.split('\n\n')

  let solution02Count = 0

  questionInput.forEach(function (item) {
    const answers = item.replace(/\n/g, ' ').split(' ')
    const uniqueAnswers = {}
    answers.forEach(function (answerLine) {
      answerLine.split('').forEach(function (character) {
        uniqueAnswers[character] = (uniqueAnswers[character] || 0) + 1
      })
    })

    const questionsAnsweredByEveryone = Object.keys(uniqueAnswers).filter(function (character) {
      return uniqueAnswers[character] === answers.length
    })
    solution02Count = solution02Count + questionsAnsweredByEveryone.length
  })
  report('Solution 2:', solution02Count)
}

run()
