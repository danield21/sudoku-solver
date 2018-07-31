import getPossibleNumbers from './possibleNumber'

/**
 * Uses a simple elimination method to determine the correct numbers
 * @param {import('../model/puzzle').Puzzle} puzzle
 */
export default function simpleElimination(puzzle) {
	const solveCell = (row, column) => {
		const possibleNumbers = getPossibleNumbers(puzzle, row, column)

		if(possibleNumbers.size === 1) {
			puzzle.getCell(column, row).value = possibleNumbers.values().next().value
			return true
		}

		return false
	}

	for(let row = 0; row < puzzle.size; ++row) {
		for(let column = 0; column < puzzle.size; ++column) {
			if(!puzzle.getCell(column, row).filled && solveCell(row, column)) {
				return true
			}
		}
	}

	return false
}
