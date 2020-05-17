import React, { useState }from 'react'
import { Form } from 'react-bootstrap'
import { Button } from 'react-bootstrap';
import { useDispatch	  } from 'react-redux'
import { login		  } from '../reducers/loginReducer'
import { showNotification } from '../reducers/NotificationReducer'
import blogService  from '../services/blogs'
import loginService from '../services/login'

const useField = (type) => {
	const [value, setValue] = useState('')

	const onChange = (event) => { setValue(event.target.value) }

	return { type, value, onChange }
}

const LoginForm = () => {
	const username = useField('text')
	const password = useField('password')

	const dispatch	= useDispatch()

	const handleLogin = async (event) => {
		event.preventDefault()
		try {
			const user = { username: username.value, password: password.value }
			const loginResponse = await loginService.login(user)

			dispatch(login(loginResponse))
			// eslint-disable-next-line no-undef
			window.localStorage.setItem(
				'loggedBlogAppUser', JSON.stringify(loginResponse)
			)

			blogService.setToken(loginResponse.token)

			username.onChange({target: {value: ''}})
			password.onChange({target: {value: ''}})
			dispatch(showNotification(`${loginResponse.name} logged in`, "success", 5))
		} catch (exception) {
			dispatch(showNotification(exception.response.data.error, "error", 5))
		}
	}

	return (
		<div>
			<h2>Login</h2>
			<form onSubmit={handleLogin}>
				<Form.Label column sm={2}>
					username:
				</Form.Label>
				<input id="username-input" {...username} /><br />
				<Form.Label column sm={2}>
					password
				</Form.Label>
				<input id="password-input" type="password" {...password} /><br />
				<Button id="login-submit" 
					type="submit"
					variant="success"
				>login</Button>
			</form>
		</div>
	)
}

export default LoginForm
