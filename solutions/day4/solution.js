const path = require('path')
const { read, position } = require('promise-path')
const fromHere = position(__dirname)
const report = (...messages) => console.log(`[${require(fromHere('../../package.json')).logName} / ${__dirname.split(path.sep).pop()}]`, ...messages)

async function run () {
  const input = (await read(fromHere('input.txt'), 'utf8')).trim()

  await solveForFirstStar(input)
  await solveForSecondStar(input)
}

function checkPassportValiditity (passportLine) {
  const line = passportLine.replace(':', '')

  const birthYear = line.includes('byr')
  const issueYear = line.includes('iyr')
  const expirationYear = line.includes('eyr')
  const height = line.includes('hgt')
  const hairColour = line.includes('hcl')
  const eyeColour = line.includes('ecl')
  const passportID = line.includes('pid')
  // const countryID = line.some('cid')

  return birthYear && expirationYear && issueYear && height && hairColour && eyeColour && passportID
}

async function solveForFirstStar (input) {
  const passports = input.split('\n\n')
  console.log(passports.length)

  let result
  let counter = 0

  passports.forEach(function (passportLine) {
    result = checkPassportValiditity(passportLine)
    if (result === true) {
      counter++
    }
  })

  report('Solution 1:', counter)
}

async function solveForSecondStar (input) {
  const solution = 'UNSOLVED'
  report('Solution 2:', solution)
}

run()
