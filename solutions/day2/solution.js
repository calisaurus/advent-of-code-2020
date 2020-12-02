const path = require('path')
const { read, position } = require('promise-path')
const fromHere = position(__dirname)
const report = (...messages) => console.log(`[${require(fromHere('../../package.json')).logName} / ${__dirname.split(path.sep).pop()}]`, ...messages)

async function run () {
  const input = (await read(fromHere('testInput.txt'), 'utf8')).trim()

  await solveForFirstStar(input)
  await solveForSecondStar(input)
}

function findCountOfChar (a, b) {
  return a.split('').filter(x => x === b).length
}

async function solveForFirstStar (input) {
  const solution = 'UNSOLVED'

  const lines = input.split('\n')

  const line = lines[0].replace(':', '').replace('-', ' ')

  console.log(line)

  const password = line.split(' ')[3]
  console.log(password)
  const character = line.split(' ')[2]
  console.log('Char', character)
  const min = line.split(' ')[0]
  const max = line.split(' ')[1]

  const countOfChar = findCountOfChar(password, character)
  console.log(countOfChar)

  if (countOfChar >= min && countOfChar <= max) {
    console.log(true)
  }

  report('Input:', input)
  report('Solution 1:', solution)
}

async function solveForSecondStar (input) {
  const solution = 'UNSOLVED'
  report('Solution 2:', solution)
}

run()
