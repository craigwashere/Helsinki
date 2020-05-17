import React, { useState, useEffect } from 'react'
import Blog         from './components/Blog'
import BlogForm     from './components/BlogForm'
import Togglable    from './components/Togglable'
import LoginForm    from './components/LoginForm'
import Notification from './components/Notification'
import blogService  from './services/blogs'
import loginService from './services/login'

const App = () => {
	const [blogs, setBlogs] = useState([])
	const [Message,         setMessage]         = useState(null)
	const [messageType,     setMessageType ]	= useState('success')
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [user, setUser] = useState(null)

	const blogFormRef = React.createRef()

	useEffect(() => {
		blogService
			.getAll()
			.then(initialblogs => {
				initialblogs.sort((a, b) => b.likes - a.likes)
				setBlogs(initialblogs)
			})
	}, [])

	useEffect(() => {
		// eslint-disable-next-line no-undef
		const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON)
			setUser(user)
			blogService.setToken(user.token)
		}
	}, [])

	const addBlog = async (blogObject) => {
		blogFormRef.current.toggleVisibility()

		try {
			const returnedBlog = await blogService.create(blogObject)

			setBlogs(blogs.concat(returnedBlog))

			setMessageType('success')
			setMessage(`a new blog ${blogObject.title} by ${blogObject.author} added`)
			setTimeout(() => { setMessage(null) }, 5000)
		} catch(exception) {
			setMessageType('error')
			setMessage('something went wrong')
			setTimeout(() => { setMessage(null) }, 5000)
		}
	}

	const addLike = async (id) => {
		const blog = blogs.find(n => n.id === id)
		const changedBlog = { ...blog, likes: blog.likes+1 }

		try {
			const returnedBlog = await blogService.update(id, changedBlog)

			setBlogs(blogs.map(blog => (blog.id !== id) ? blog : returnedBlog))

			setMessageType('success')
			setMessage(`you liked ${returnedBlog.title} by ${returnedBlog.author}`)
			setTimeout(() => { setMessage(null) }, 5000)
		} catch(exception) {
			setMessageType('error')
			setMessage('something went wrong')
			setTimeout(() => { setMessage(null) }, 5000)
		}
	}

	const deleteBlog = async (id) => {
		const blogToDelete = blogs.find(element => element.id === id)

		// eslint-disable-next-line no-undef
		if (!window.confirm(`Delete ${blogToDelete.title} by ${blogToDelete.author}?`))
			return
		try {
			await blogService.remove(id)

			blogs.splice(blogs.findIndex(element => element.id === id), 1)

			setMessageType('success')
			setMessage('blog deleted')
			setTimeout(() => { setMessage(null) }, 5000)
		} catch(exception) {
			setMessageType('error')
			setMessage('something went wrong')
			setTimeout(() => { setMessage(null) }, 5000)
		}
	}

	const handleLogin = async (event) => {
		event.preventDefault()
		try {
			const user = await loginService.login({ username, password, })

			// eslint-disable-next-line no-undef
			window.localStorage.setItem(
				'loggedBlogAppUser', JSON.stringify(user)
			)

			blogService.setToken(user.token)
			setUser(user)
			setUsername('')
			setPassword('')
		} catch (exception) {
			setMessageType('error')
			setMessage('wrong credentials')
			setTimeout(() => { setMessage(null) }, 5000)
		}
	}

	const loginForm = () => (
		<Togglable buttonLabel='login'>
			<LoginForm
				username={username}
				password={password}
				handleUsernameChange={({ target }) => setUsername(target.value)}
				handlePasswordChange={({ target }) => setPassword(target.value)}
				handleSubmit={handleLogin}
			/>
		</Togglable>
	)

	const blogForm = () => (
		<Togglable buttonLabel='new BLOG' ref={blogFormRef}>
			<BlogForm createBlog={addBlog}/>
		</Togglable>
	)

	const logout = () => {
		// eslint-disable-next-line no-undef
		window.localStorage.removeItem('loggedBlogAppUser')
		setUser(null)
	}

	return (
		<div>
			<h2>blogs</h2>
			<Notification message={Message} messageType = {messageType}/>
			{(user === null)? loginForm() :
				<div>
					<p>{user.name} logged in <button id="logout-button" onClick={logout}>Log Out</button></p>
					{blogForm()}
					<hr />
					{blogs.map(blog => <Blog key={blog.id} blog={blog}
						addLike = {() => addLike(blog.id)}
						deleteBlog = {() => deleteBlog(blog.id)}/>)}
				</div>
			}
		</div>
	)
}

export default App
