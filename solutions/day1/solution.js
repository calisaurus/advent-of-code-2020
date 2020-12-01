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
  let solution
  const str = input
  const res = str.split('\n').map(Number)

  res.forEach(function (expense) {
    const searchResult = res.filter(function (item) {
      return item === 2020 - expense
    })
    if (searchResult.length > 0) {
      console.log(searchResult)
      const otherExpense = searchResult[0]
      solution = expense * otherExpense
      console.log(solution)
    }
  })

  report('Solution 1:', solution)
}

async function solveForSecondStar (input) {
  let solution
  const str = input
  const res = str.split('\n').map(Number)

  res.forEach(function (a) {
    res.forEach(function (b) {
      const searchResult = res.filter(function (item) {
        return item === 2020 - a - b
      })
      if (searchResult.length > 0) {
        console.log(searchResult)
        const c = searchResult[0]
        solution = a * b * c
        console.log(solution)
      }
    })
  })
  report('Solution 2:', solution)
}

run()
