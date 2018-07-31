/**
 * Cell contains all of the business logic for a cell within a Sudoku puzzle
 */
export default class Cell {
	/**
	 * Creates a Cell corresponding to the given input element
	 * @param {HTMLInputElement} input Input field for the cell to be based off of
	 */
	constructor(input) {
		this.input = input
	}

	/**
	 * Checks if the field is filled
	 */
	get filled() {
		return this.value !== null
	}

	/**
	 * Current value of the field, returns null if not filled.
	 */
	get value() {
		const value = this.input.value
		return value !== ""
			? +value
			: null
	}

	/**
	 * Setting the value will change the DOM. Setting to null reverses any effects
	 * @param {Number} value Value to be set
	 */
	set value(value) {
		if(value === null) {
			this.input.classList.remove('added')
			this.input.value = ""
		} else {
			this.input.classList.add('added')
			this.input.value = value
		}
	}
}