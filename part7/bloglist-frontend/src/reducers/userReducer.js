/* I've left some functions in case we have to revisit this and add them later */

const userReducer = (state = [], action) => {
	console.log('userReducer state now: ', state)
	console.log('userReducer action', action)

	switch(action.type)
	{
//		case 'CREATE':		return [...state, action.data]
		case 'USER_INIT':	return [...action.data]
//		case 'REMOVE':		return state.filter(element => element.id !== action.data.id)
		default:		return state
	}

}
/*
export const createUser = (content) => {
	return async dispatch => {
		const newUser = await userService.create(content)
		dispatch({
			type: 'CREATE',
			data: newUser,
		})
	}
}
*/
export const initializeUsers = (users) => {
	return dispatch => {
		dispatch({
			type: 'USER_INIT',
			data: users,
		})
	}
}
/*
export const removeUser = (id) => {
	return async dispatch => {
		await userService.remove(id)
		dispatch({
			type: 'REMOVE',
			data: { id },
		})
	}
}
*/
export default userReducer