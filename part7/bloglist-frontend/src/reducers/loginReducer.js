
const loginReducer = (state = [], action) => {
	console.log('loginReducer state now: ', state)
	console.log('loginReducer action', action)

	switch(action.type)
	{
		case 'LOGIN':	return action.data
		case 'LOGOUT':	return null
		default:	return state
	}

}

export const login = (user) => {
	return dispatch => {
		dispatch({
			type: 'LOGIN',
			data: {username: user.username,
				name: user.name}
		})
	}
}

export const logout = () => {
	return dispatch => {
		dispatch({
			type: 'LOGOUT',
			data: null,
		})
	}
}
export default loginReducer