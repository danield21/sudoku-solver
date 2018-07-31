/* eslint-env browser */

import * as PuzzleForm from './puzzle'

/**
 * Initializes the document for the start
 * @returns {void}
 */
export function init() {
	//Searches for a form with the class of start
	var startForm = document.querySelector('form.start')

	//Setups an event listener for submit so that when the level is entered,
	//A grid can be created based on it
	startForm.addEventListener('submit', PuzzleForm.init)
}