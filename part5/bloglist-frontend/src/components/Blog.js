import React, { useState } from 'react'

const Blog = ({ blog, addLike, deleteBlog }) => {
	const [verbose, setVerbose] = useState(false)

	const blogStyle = {
		paddingTop: 10,
		paddingLeft: 2,
		border: 'solid',
		borderWidth: 1,
		marginBottom: 5
	}

	const MoreInformation = () => (
		<div className='MoreInformation'>
			<div>{blog.url}</div>
			<div id='div-likes'>
                likes: {blog.likes}
				<button id='button-like' onClick={addLike}>like</button>
			</div>
			<div>
				{blog.user.name}
			</div>
		</div>
	)

	return (
		<div style = {blogStyle} className='blog'>
			<div>
				{blog.title} {blog.author}
				<button id='button-verbose' onClick={() => setVerbose(!verbose)}>
					{verbose ? 'hide' :'view'}</button>
				<button id='button-deleteBlog'  onClick={deleteBlog}>delete</button>
				{verbose ? <MoreInformation /> : null }
			</div>
		</div>
	)
}

export default Blog
