const path = require('path')
const { read, position } = require('promise-path')
const fromHere = position(__dirname)
const report = (...messages) => console.log(`[${require(fromHere('../../package.json')).logName} / ${__dirname.split(path.sep).pop()}]`, ...messages)

async function run () {
  const input = (await read(fromHere('input.txt'), 'utf8')).trim()

  await solveForFirstStar(input)
  await solveForSecondStar(input)
}

function findCountOfChar (a, b) {
  return a.split('').filter(x => x === b).length
}

function validatePasswordLine (passwordLine) {
  const line = passwordLine.replace(':', '').replace('-', ' ')

  const min = line.split(' ')[0]
  const max = line.split(' ')[1]
  const character = line.split(' ')[2]
  const password = line.split(' ')[3]

  const countOfChar = findCountOfChar(password, character)

  if (countOfChar >= min && countOfChar <= max) {
    return true
  } else {
    return false
  }
}

async function solveForFirstStar (input) {
  const solution = 'UNSOLVED'

  const lines = input.split('\n')

  let result
  let counter = 0

  lines.forEach(function (line) {
    result = validatePasswordLine(line)
    if (result === true) {
      counter++
    }
  })
  console.log('count = ', counter)

  // report('Input:', input)
  report('Solution 1:', solution)
}

async function solveForSecondStar (input) {
  const solution = 'UNSOLVED'
  report('Solution 2:', solution)
}

run()
