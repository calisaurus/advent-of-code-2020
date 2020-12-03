const path = require('path')
const { read, position } = require('promise-path')
const fromHere = position(__dirname)
const report = (...messages) => console.log(`[${require(fromHere('../../package.json')).logName} / ${__dirname.split(path.sep).pop()}]`, ...messages)

async function run () {
  const input = (await read(fromHere('input.txt'), 'utf8')).trim()

  await solveForFirstStar(input)
  await solveForSecondStar(input)
}

function getTileAt (lines, x, y) {
  const width = lines[0].length

  return lines[y].charAt(x % width)
}

function testASlope (input, dx, dy) {
  const lines = input.split('\n')
  const height = lines.length
  let posx = 0
  let posy = 0

  let counter = 0

  do {
    const character = getTileAt(lines, posx, posy)
    if (character === '#') {
      counter++
    }
    posx = posx + dx
    posy = posy + dy
  } while (posy < height)

  return counter
}

async function solveForFirstStar (input) {
  const dx = 3
  const dy = 1

  const lines = input.split('\n')
  const height = lines.length
  let posx = 0
  let posy = 0

  let counter = 0

  do {
    const character = getTileAt(lines, posx, posy)
    if (character === '#') {
      counter++
    }
    posx = posx + dx
    posy = posy + dy
  } while (posy < height)

  report('Solution 1:', counter)
}

async function solveForSecondStar (input) {
  const a = testASlope(input, 1, 1)
  const b = testASlope(input, 3, 1)
  const c = testASlope(input, 5, 1)
  const d = testASlope(input, 7, 1)
  const e = testASlope(input, 1, 2)

  console.log(a, b, c, d, e)

  const solution = a * b * c * d * e
  report('Solution 2:', solution)
}

run()
