import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
	const notifications = useSelector(state => state.notification)

	const style = {
		border: 'solid',
		padding: 10,
		borderWidth: 1
	}
	
	return (
		<div style={style}>
			{notifications.content}
		</div>
	)
}

export default Notification