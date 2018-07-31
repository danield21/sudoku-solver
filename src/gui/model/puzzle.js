/**
 * Puzzle contains all of the business logic for a Sudoku puzzle
 */
export default class Puzzle {
	/**
	 * Creates a empty puzzle corresponding to the given level
	 * @param {Number} level Level of the puzzle to be created
	 */
	constructor(level) {
		this.level = level
		this.cells = []
	}

	/**
	 * Read-only property for the total area
	 */
	get area() {
		return this.size * this.size
	}

	/**
	 * Read-only property for the width/height of the puzzle
	 */
	get size() {
		return this.level * this.level
	}

	/**
	 * Checks if the puzzle is completely filled in
	 */
	get filledIn() {
		return this.cells.every(cell => cell.value !== null)
	}

	/**
	 * Returns a cell corresponding to the column/row
	 * @param {Number} column Column to get
	 * @param {Number} row Row to get
	 * @returns {import('./cell').Cell}
	 */
	getCell(column, row) {
		return this.cells[row * this.size + column]
	}

	/**
	 * Adds a cell to the puzzle
	 * @param {Cell} cell Cell to be added
	 * @returns {void}
	 * @throws {RangeError} If too many cells are added, an RangeError with be thrown
	 */
	add(cell) {
		if(this.cells.length >= this.area) {
			throw new RangeError(`current Sudoku level ${this.level} cannot hold greater than ${this.area} cells`)
		}

		this.cells.push(cell)
	}

	/***
	 * Attempts to solve the sudoku with the following methods
	 * @param {Function[]} methods Different ways for a sudoku puzzle to be solved
	 * @returns {void}
	 */
	solveWith(...methods) {
		if(this.cells.length !== this.area) {
			throw new RangeError(`current Sudoku level ${this.level} has ${this.this.cells.length} cells, but needs ${this.area} cells`)
		}
	
		/** @type {Boolean} */
		let gotNumber
		do {
			gotNumber = false
			for(let method of methods) {
				while(method(this)) {
					gotNumber = true
				}
			}
		} while(!this.filledIn && gotNumber)
	}
}
