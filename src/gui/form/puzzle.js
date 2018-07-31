/* eslint-env browser */

import Puzzle from '../model/puzzle'
import Cell from '../model/cell'
import simpleElimination from '../engine/simpleElimination'

/***
 * Initializes the document for the puzzle
 * @this {HTMLFormElement}
 * @param {Event} e Event object, default will be prevented
 * @returns {void}
**/
export function init(e) {
	//Prevents the default action, which in this case would submit the form
	//This is unnecessary, as all of the logic is handled on this same page
	e.preventDefault()

	//Searches for a form with the class of puzzle
	/** @type {HTMLFormElement} */
	const puzzleForm = document.querySelector('form.puzzle')

	//Searches for the element with the class of grid that is under the puzzleForm
	const grid = puzzleForm.querySelector('.grid')

	//Gets level value from the form.
	//When you have a form, you can reference the inputs by the name that is set (startForm.level)
	//Then you can get the value by the value property
	//The plus sign is to convert it to a number
	const level = +this.level.value

	const size = level * level

	//Removes the active class from this form
	//This should make it disappear based on the CSS
	this.classList.remove('active')

	//Starts the loop at 1, as it would be easier to determine when each group ends
	for(let x = 1; x <= size; ++x) {
		//Creates the tr for a new row
		const row = document.createElement('tr')

		//Adds the row to the grid
		grid.appendChild(row)

		//Starts the loop at 1, as it would be easier to determine when each group ends
		for(let y = 1; y <= size; ++y) {
			//Creates a td for the table as a wrapper for the cell
			const cell = document.createElement('td')

			//Creates a input to be treated as a cell within the puzzle
			const cellField = document.createElement('input')

			//Although unecessary, the default of an input is text,
			//Might as well be sure to set the type to text
			cellField.setAttribute('type', 'text')

			//For display puroses, determines when each group ends,
			//So that the css can apply a thicker bar on the bottom.
			//Skips over the last one, as that would would be unnecessary
			//Uses the modulus operator, as it is a good way to determine when each group ends
			if(x % level === 0 && x !== size) {
				cell.classList.add('group-v')
			}

			//For display puroses, determines when each group ends,
			//so that the css can apply a thicker bar on the right
			//Skips over the last one, as that would would be unnecessary
			//Uses the modulus operator, as it is a good way to determine when each group ends
			if(y % level === 0 && y !== level*level) {
				cell.classList.add('group-h')
			}

			cell.appendChild(cellField)

			//Adds the cell to the created row,
			//Which as already added to the grid
			row.appendChild(cell)
		}
	}

	//Adds the active class to the puzzleForm,
	//So that it will appear, based on the CSS
	puzzleForm.classList.add('active')

	//Setups an event listener for submit so that when the sudoku is filled in,
	//It can give the solution to it
	puzzleForm.addEventListener('submit', solvePuzzle(grid, level))

	//Queries the puzzleForm for the reset button and add an event listener to it
	//By default, a button with type reset will clear all of the inputs
	puzzleForm.querySelector('button[type=reset]').addEventListener('click', function (e) {
		//Gets all of the elements with the class 'added'
		const added = grid.querySelectorAll('.added')

		//If there are elements with the added class,
		//Instead of clearing all of the inputs,
		//It will clear only the fields with that class 'added'
		//And remove that class
		if(added.length) {
			e.preventDefault()
			for(let cell of added) {
				cell.classList.remove('added')
				cell.value = ""
			}
		}
	})
}

/**
 * Creates a function to be used to solve the puzzle
 * @param {Element} grid Element where all of the cells are located at
 * @param {Number} level The level of the sudoku that needs to be solved
 * @returns {Function} Can be used in a event listener
 */
function solvePuzzle(grid, level) {
	/***
	 * Uses a Closure to return a function based on the grid and level
	 * @param {Event} e Event object that the EventListener produces
	 * @returns {void}
	**/
	return function (e) {
		//Prevents the default action, which in this case would submit the form
		//This is unnecessary, as all of the logic is handled on this same page
		e.preventDefault()

		//Creates a new puzzle to be solved
		let puzzle = new Puzzle(level)
		//Loops through the tr's within the table
		for(let row of grid.children) {
			//Loops through the td's within the tr
			for(let cell of row.children) {
				//Adds the cells to the puzzle
				//The input field is the only child of the td, so we use firstElementChild
				puzzle.add(new Cell(cell.firstElementChild))
			}
		}

		//Attempt to solve the puzzle through the specified algorithms
		puzzle.solveWith(simpleElimination)
	}
}