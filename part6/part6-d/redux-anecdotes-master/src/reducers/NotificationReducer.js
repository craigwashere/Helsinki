const NotificationAtStart = 'craig was here'
var timeoutID;

const notificationAsObject = (anecdote) => {
	return { content: anecdote }
}

const notificationReducer = (state = notificationAsObject(NotificationAtStart), action) => {
	console.log('notificationReducer state now: ', state)
	console.log('notificationReducer action', action)

	switch(action.type)
	{
		case 'SHOW':	return notificationAsObject(`You voted for "${action.data.message}"`)
		case 'HIDE':	return notificationAsObject('')
		default:	return state
	}
}

export const showNotification = (message, time) => {
	return async dispatch => {
		dispatch({
			type: 'SHOW',
			data: { message }
		})
		if (timeoutID !== undefined)	clearTimeout(timeoutID)
		timeoutID = setTimeout(() => dispatch({type: 'HIDE'}), time*1000)
	}
}

export const hideNotification = () => {
	return {
		type: 'HIDE'
	}
}

export default notificationReducer