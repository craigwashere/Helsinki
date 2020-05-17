const NotificationAtStart = 'craig was here'

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

export const showNotification = (message) => {
	return {
		type: 'SHOW',
		data: { message }
	}
}

export const hideNotification = () => {
	return {
		type: 'HIDE'
	}
}

export default notificationReducer