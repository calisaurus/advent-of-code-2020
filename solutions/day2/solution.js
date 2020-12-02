const path = require('path')
const { read, position } = require('promise-path')
const fromHere = position(__dirname)
const report = (...messages) => console.log(`[${require(fromHere('../../package.json')).logName} / ${__dirname.split(path.sep).pop()}]`, ...messages)

async function run () {
  const input = (await read(fromHere('input.txt'), 'utf8')).trim()
  // const test = (await read(fromHere('testInput.txt'), 'utf8')).trim()

  await solveForFirstStar(input)
  await solveForSecondStar(input)
}

function findCountOfChar (a, b) {
  return a.split('').filter(x => x === b).length
}

function getCharacterAtPosition (str, position) {
  return str.split('')[position - 1]
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

function validatePasswordByPosition (passwordLine) {
  const line = passwordLine.replace(':', '').replace('-', ' ')

  const positionA = line.split(' ')[0]
  const positionB = line.split(' ')[1]
  const character = line.split(' ')[2]
  const password = line.split(' ')[3]

  const characterAtPositionA = getCharacterAtPosition(password, positionA)
  const characterAtPositionB = getCharacterAtPosition(password, positionB)

  const characterIsNotSame = characterAtPositionA !== characterAtPositionB
  const characterExistsAtPosition = characterAtPositionA === character || characterAtPositionB === character

  if (characterIsNotSame && characterExistsAtPosition) {
    return true
  } else {
    return false
  }
}

async function solveForFirstStar (input) {
  const lines = input.split('\n')

  let result
  let counter = 0

  lines.forEach(function (line) {
    result = validatePasswordLine(line)
    if (result === true) {
      counter++
    }
  })
  report('Part 1 solution = ', counter)
}

async function solveForSecondStar (input) {
  const lines = input.split('\n')

  let result
  let counter = 0

  lines.forEach(function (line) {
    result = validatePasswordByPosition(line)
    if (result === true) {
      counter++
    }
  })
  report('Part 2 solution =', counter)
}

run()
