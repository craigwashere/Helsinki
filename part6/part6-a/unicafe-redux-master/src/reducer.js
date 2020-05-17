const initialState = {
	good: 0,
	ok: 0,
	bad: 0
}

const counterReducer = (state = initialState, action) => {
	console.log(action)
	let returnState = {...state}
	switch (action.type) {
		case 'GOOD':	returnState.good = (state.good + 1)
				break;
		case 'OK':	returnState.ok	 = state.ok   + 1
				break;
		case 'BAD':	returnState.bad  = state.bad  + 1
				break;
		case 'ZERO':	returnState.good = 0
				returnState.ok   = 0
				returnState.bad  = 0
				break;
		default: 	return state
	}
	return returnState
}

export default counterReducer