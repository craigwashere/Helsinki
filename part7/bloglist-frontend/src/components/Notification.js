import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
	const notification = useSelector(state => state.notification)

	if ((notification === undefined) || (notification.message === null)) {
		return null
	}

	return (<div className={notification.type}>{notification.message}</div>)
}

export default Notification