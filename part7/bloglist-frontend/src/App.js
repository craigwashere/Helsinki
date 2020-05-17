import React, { useEffect } from 'react'
import Blog         from './components/Blog'
import BlogForm     from './components/BlogForm'
import Togglable    from './components/Togglable'
import LoginForm    from './components/LoginForm'
import Notification from './components/Notification'
import User         from './components/User'
import blogService  from './services/blogs'
import userService  from './services/users'

import {
  Switch,
  Route,
  Link,
  Redirect,
  useRouteMatch,
} from "react-router-dom"

import { Table } from 'react-bootstrap'

import { useSelector, useDispatch } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUsers } from './reducers/userReducer'
import { login, logout as loginReducer_logout } from './reducers/loginReducer'
import { hideNotification, showNotification } from './reducers/NotificationReducer'

const App = () => {
	const dispatch = useDispatch()
	const blogs	= useSelector(state => state.blogs)
	const users	= useSelector(state => state.users)
	const user	= useSelector(state => state.user)

	const blogFormRef = React.createRef()

	useEffect(() => {
		try {
			blogService.getAll()
			.then(initialBlogs => dispatch(initializeBlogs(initialBlogs)))

			userService.getAll()
			.then(initialUsers => dispatch(initializeUsers(initialUsers)))
		} catch(exception) {
			dispatch(showNotification(exception.response.data.error, "error", 5))
		}

		dispatch(hideNotification())

		// eslint-disable-next-line no-undef
		const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON)
			dispatch(login(user))
			blogService.setToken(user.token)
		}
	},[])

	const loginForm = () => (
		<Togglable buttonLabel='login'>
			<LoginForm />
		</Togglable>
	)

	const blogForm = () => (
		<Togglable buttonLabel='new BLOG' ref={blogFormRef}>
			<BlogForm />
		</Togglable>
	)

	const logout = () => {
		// eslint-disable-next-line no-undef
		window.localStorage.removeItem('loggedBlogAppUser')
		dispatch(loginReducer_logout())
	}

	const padding = { paddingRight: 5 }

	const match = useRouteMatch('/blogs/:id')
	const blogById = (id) => blogs.find(a => a.id === id)
	const blog = match ? blogById(match.params.id) : null

	const userMatch = useRouteMatch('/users/:id')
	const userById = (id) => users.find(a => a.id === id)
	const user2 = userMatch ? userById(userMatch.params.id) : null

	return (
		<div className="container">
			<div>
        			<Link style={padding} to="/blogs">blogs</Link>
	        		<Link style={padding} to="/users">users</Link>
				{((user === null) || (user.name === undefined))? loginForm() : 
					<em>{user.name} logged in <button id="logout-button" onClick={logout}>Log Out</button></em>
				}
			</div>
			<div>
				<h1>Blog Application</h1>
				<Notification />
				<Switch>
					<Route path="/blogs/:id" >
						{blog ? <Blog blog={blog} /> : <Redirect to="/" /> }
					</Route>
					<Route path="/users/:id">
						<User	user={user2}
							blogs={user2 ? blogs.filter(blog => blog.user.id === user2.id) : null}
						/>
						
					</Route>
					<Route path="/users">
						<h2>Users</h2>
						<Table striped size="sm">
							<thead>
								<tr>
									<th>User</th>
									<th>number of blogs added</th>
								</tr>
							</thead>
							<tbody>
								{users.map(user =>
									<tr key={user.id}> 
										<td>
											<Link to = {`/users/${user.id}`}>{user.name}</Link>
										</td>
										<td>
											{blogs.filter(blog => blog.user.id === user.id).length}
										</td>
									</tr>
								)}
							</tbody>
						</Table>
					</Route>
					<Route path="/">
						<h2>Blogs</h2>
						<ul>{blogs.map(blog =>
							<li key={blog.id}> 
								<Link to = {`/blogs/${blog.id}`}>{blog.title}</Link>
							</li>
						)}</ul>
					</Route>
				</Switch>
				{(user === null)? null : <div>{blogForm()}</div> }
			</div>
		</div>
	)
}

export default App
