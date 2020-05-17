import React, { useState } from 'react'

const BlogForm = ({ createBlog }) => {
	const [newBlogTitle,    setNewBlogTitle]    = useState('')
	const [newBlogAuthor,   setNewBlogAuthor]   = useState('')
	const [newBlogURL,      setNewBlogURL]      = useState('')

	const handleBlogTitleChange = (event) => {
		setNewBlogTitle(event.target.value)
	}
	const handleBlogAuthorChange = (event) => {
		setNewBlogAuthor(event.target.value)
	}
	const handleBlogURLChange = (event) => {
		setNewBlogURL(event.target.value)
	}

	const addBlog = (event) => {
		event.preventDefault()
		const blogObject = {
			title:  newBlogTitle,
			author: newBlogAuthor,
			url:    newBlogURL,
			likes:  0,
		}

		createBlog(blogObject)

		setNewBlogTitle('')
		setNewBlogAuthor('')
		setNewBlogURL('')
	}

	return (
		<div className="BlogForm">
			<h2>Create a new Blog</h2>
			<form onSubmit={addBlog}>
                Title:  <input id='input-title'     value={newBlogTitle}     onChange={handleBlogTitleChange}/><br />
                Author: <input id='input-author'    value={newBlogAuthor}    onChange={handleBlogAuthorChange}/><br />
                URL:    <input id='input-URL'       value={newBlogURL}       onChange={handleBlogURLChange}/><br />
				<button id="blog-submit" type="submit">save</button>
			</form>
		</div>
	)
}

export default BlogForm
