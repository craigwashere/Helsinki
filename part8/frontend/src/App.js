import React, { useState, useEffect } from 'react'
import { useApolloClient } from '@apollo/client'
import Authors 		from './components/Authors'
import Books 		from './components/Books'
import NewBook 		from './components/NewBook'
import BirthYear 	from './components/birthYear'
import LoginForm 	from './components/LoginForm'
import Recommended	from './components/recommended'

const Notify = ({ errorMessage }) => {
	if ( !errorMessage ) { return null }
console.log("errorMessge", errorMessage)
	return (<div style={{color: 'red'}}>{errorMessage}</div>)
}

const App = () => {
	const [page, setPage] 			= useState('authors')
	const [token, setToken]			= useState(null)
	const [errorMessage, setErrorMessage]	= useState(null)
	const client = useApolloClient()

	useEffect(() => {
	        const token = localStorage.getItem('books-user-token')
        	if ( token ) {
	            setToken(token)
        	}
	}, [token])

	const logout = () => {
		setToken(null)
		localStorage.clear()
		client.resetStore()
	}

	const notify = (message) => {
		setErrorMessage(message)
		setTimeout(() => { setErrorMessage(null) }, 5000)
	}

	const ButtonHeader = () => {
		if (token)
			return (
				<div>
					<button onClick={() => setPage('authors')	}>authors	</button>
					<button onClick={() => setPage('books')		}>books		</button>
					<button onClick={() => setPage('add')		}>add book	</button>
					<button onClick={() => setPage('recommended')	}>recommended	</button>
					<button onClick={logout}>Logout					</button>
				</div>
			)
		return (
			<div>
				<button onClick={() => setPage('authors')}>authors</button>
				<button onClick={() => setPage('books')}>books</button>
				<button onClick={() => setPage('login')}>Login</button>

			</div>
		)
	}

  return (
		<div>
			<div>
				<Notify errorMessage={errorMessage} />
				<ButtonHeader />
			</div>
				<Books	show={page === 'books'} />
				<NewBook	show={page === 'add'}   setError={notify}   />
				<LoginForm	show={page === 'login'}
							setToken={setToken}
							setError={notify} />
				<Recommended	show={page === 'recommended'} /> 
				<Authors	show={page === 'authors'} />
			{token ? <BirthYear setError={notify}/> : null }
		</div>
	)
}

export default App