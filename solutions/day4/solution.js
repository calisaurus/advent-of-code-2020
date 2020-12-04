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

function validateBirthYear (passport) {
  if (passport.byr >= 1920 && passport.byr <= 2002) {
    return true
  }
  return false
}

function validateIssueYear (passport) {
  if (passport.iyr >= 2010 && passport.iyr <= 2020) {
    return true
  }
  return false
}

function validateExpiryYear (passport) {
  if (passport.eyr >= 2020 && passport.eyr <= 2030) {
    return true
  }
  return false
}

function validatePassportID (passport) {
  if (passport.pid && passport.pid.length === 9) {
    return true
  }
  return false
}

function validateEyeColour (passport) {
  if (passport.ecl === 'amb' || passport.ecl === 'blu' || passport.ecl === 'brn' || passport.ecl === 'gry' || passport.ecl === 'grn' || passport.ecl === 'hzl' || passport.ecl === 'oth') {
    return true
  }
  return false
}

function validateHairColour (passport) {
  if (passport.hcl) {
    const parts = passport.hcl.split('')
    const startsWithAHash = parts[0] === '#'
    const containsValidCharacters = /^#[a-f0-9]{6}$/.test(passport.hcl)
    return startsWithAHash && containsValidCharacters
  }
  return false
}

function validateHeightInCM (passport) {
  if (passport.hgt.includes('cm')) {
    const heightInCM = passport.hgt.replace('cm', '')
    if (heightInCM >= 150 && heightInCM <= 193) {
      return true
    }
  }
  return false
}

function validateHeightInIN (passport) {
  if (passport.hgt.includes('in')) {
    const heightInIN = passport.hgt.replace('in', '')
    if (heightInIN >= 59 && heightInIN <= 76) {
      return true
    }
  }
  return false
}

function validateHeight (passport) {
  return validateHeightInCM(passport) || validateHeightInIN(passport)
}

function validatePassport (passport) {
  return validateBirthYear(passport) && validateIssueYear(passport) && validateExpiryYear(passport) &&
    validatePassportID(passport) && validateEyeColour(passport) && validateHairColour(passport) && validateHeight(passport)
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
  const passports = input.split('\n\n')

  const passportObjects = passports.map(function (passport) {
    const result = {}
    const fields = passport.replace(/\n/g, ' ').split(' ')
    // item = 'key:value:
    fields.forEach(function (item) {
      const key = item.split(':')[0]
      const value = item.split(':')[1]
      result[key] = value
    })
    return result
  })
  const solution = passportObjects.filter(validatePassport).length
  report('Solution 2:', solution)
}

run()
