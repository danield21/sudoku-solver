/**
 * Gets all of the possible numbers for that space
 * @param {import('../model/puzzle').Puzzle} puzzle Puzzle that needs to be solved
 * @param {Puzzle} row Row that the cell is located at
 * @param {Number} column Column that the cell is located at
 * @returns {Set<Number>} Set of numbers that are able to fit within the cell
 */
export default function getPossibleNumbers(puzzle, row, column) {
	const possibleNumbers = getAllPossibleNumbers(puzzle)

	withRow(puzzle, row, possibleNumbers)
	withColumn(puzzle, column, possibleNumbers)
	withGroup(puzzle, row, column, possibleNumbers)

	return possibleNumbers
}

/**
 * Gets a set of every possible number
 * @param {import('../model/puzzle').Puzzle} puzzle
 * @returns {Set<Number>}
 */
function getAllPossibleNumbers(puzzle) {
	const possibleNumbers = new Set()

	for(let i = 0; i < puzzle.size; ++i) {
		possibleNumbers.add(i+1)
	}

	return possibleNumbers
}

/**
 * Reduces the set of possible numbers by what is in the row
 * @param {import('../model/puzzle').Puzzle} puzzle
 * @param {Number} row 
 * @param {Set<Number>} possibleNumbers 
 */
function withRow(puzzle, row, possibleNumbers) {
	for(let column = 0; column < puzzle.size; column++) {
		const cell = puzzle.getCell(column, row)
		if(cell.filled) {
			possibleNumbers.delete(cell.value)
		}
	}
}

/**
 * Reduces the set of possible numbers by what is in the column
 * @param {import('../model/puzzle').Puzzle} puzzle
 * @param {Number} column 
 * @param {Set<Number>} possibleNumbers 
 */
function withColumn(puzzle, column, possibleNumbers) {
	for(let row = 0; row < puzzle.size; row++) {
		const cell = puzzle.getCell(column, row)
		if(cell.filled) {
			possibleNumbers.delete(cell.value)
		}
	}
}


/**
 * Reduces the set of possible numbers by what is in the group
 * @param {import('../model/puzzle').Puzzle} puzzle
 * @param {Number} row
 * @param {Number} column
 * @param {Set<Number>} possibleNumbers
 */
function withGroup(puzzle, row, column, possibleNumbers) {
	let start = {
		row: row - (row % puzzle.level),
		column: column - (column % puzzle.level),
	}
	for(let i = 0; i < puzzle.level; ++i) {
		for(let j = 0; j < puzzle.level; ++j) {
			const cell = puzzle.getCell(start.column+j, start.row+i)
			if(cell.filled) {
				possibleNumbers.delete(cell.value)
			}
		}
	}
}