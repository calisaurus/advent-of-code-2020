const path = require('path')
const { read, position } = require('promise-path')
const fromHere = position(__dirname)
const report = (...messages) => console.log(`[${require(fromHere('../../package.json')).logName} / ${__dirname.split(path.sep).pop()}]`, ...messages)

async function run () {
  const input = (await read(fromHere('input.txt'), 'utf8')).trim()

  await solveForFirstStar(input)
}

async function solveForFirstStar (input) {
  const solution = 'UNSOLVED'
  const seats = input.split('\n')

  const seatIDs = seats.map(function (seat) {
    const row = seat.substring(0, 7)

    const column = seat.substring(7)

    const binaryRow = row.replace(/[F]/g, '0').replace(/[B]/g, '1')

    const binaryColumn = column.replace(/[L]/g, '0').replace(/[R]/g, '1')

    const rowID = Number.parseInt(binaryRow, 2)

    const columnID = Number.parseInt(binaryColumn, 2)

    const seatID = (rowID * 8) + columnID

    return seatID
  })

  seatIDs.sort(function (a, b) {
    return b - a
  })

  console.log(seatIDs)

  seatIDs.forEach(function (value, index, array) {
    const nextValue = array[index + 1] || 0
    if (value - nextValue !== 1) {
      console.log('Found it!', value, value - nextValue)
    }
  })

  report('Solution 1:', solution)
}

run()
