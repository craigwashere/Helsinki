import React from 'react'

const User = ({ user, blogs }) => {
	const userStyle = {
		paddingTop: 10,
		paddingLeft: 2,
		border: 'solid',
		borderWidth: 1,
		marginBottom: 5
	}

	return (
		<div style = {userStyle} className='user'>
			<div>
				<h2>{user.name}</h2>
				<h3>added blogs</h3>
				<ul>{blogs.map(blog => 
					<li key={blog.id}>{blog.title}</li>
				)}</ul>
			</div>
		</div>
	)
}

export default User
