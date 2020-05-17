const NotificationAtStart = 'craig was here'
var timeoutID;

const notificationAsObject = (message, messageType) => {
	return { message: message, type: messageType }
}

const notificationReducer = (state = notificationAsObject(NotificationAtStart), action) => {
	console.log('notificationReducer state now: ', state)
	console.log('notificationReducer action', action)

	switch(action.type)
	{
		case 'SHOW':	return notificationAsObject(action.data.message, action.data.messageType)
		case 'HIDE':	return notificationAsObject('')
		default:	return state
	}
}

export const showNotification = (message, type, time) => {
	return async dispatch => {
		dispatch({
			type: 'SHOW',
			data: { message: message, messageType: type }
		})
		if (timeoutID !== undefined)	clearTimeout(timeoutID)
		timeoutID = setTimeout(() => dispatch({type: 'HIDE'}), time*1000)
	}
}

export const initializeNotification = () => {
	return {
		type: 'HIDE'
	}
}

export const hideNotification = () => {
	return {
		type: 'HIDE'
	}
}

export default notificationReducer