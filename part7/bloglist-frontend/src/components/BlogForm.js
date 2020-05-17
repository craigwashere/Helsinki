import React, { useState } from 'react'
import { Form } from 'react-bootstrap'
import { Button } from 'react-bootstrap';
import { createBlog } from '../reducers/blogReducer'
import { showNotification } from '../reducers/NotificationReducer'
import { useDispatch } from 'react-redux'
import blogService from '../services/blogs'

const BlogForm = (props, ref) => {
	const [newBlogTitle,    setNewBlogTitle]    = useState('')
	const [newBlogAuthor,   setNewBlogAuthor]   = useState('')
	const [newBlogURL,      setNewBlogURL]      = useState('')

	const dispatch = useDispatch()

	const handleBlogTitleChange = (event) => {
		setNewBlogTitle(event.target.value)
	}
	const handleBlogAuthorChange = (event) => {
		setNewBlogAuthor(event.target.value)
	}
	const handleBlogURLChange = (event) => {
		setNewBlogURL(event.target.value)
	}

	const resetForm = () => 
	{
		setNewBlogTitle('')
		setNewBlogAuthor('')
		setNewBlogURL('')
	}
    
	const addBlog = async (event) => {
		event.preventDefault()

		const blogObject = {
			title:  newBlogTitle,
			author: newBlogAuthor,
			url:    newBlogURL,
			likes:  0,
		}

		try {
			const newBlog = await blogService.create(blogObject)
			dispatch(createBlog(newBlog))
			dispatch(showNotification(`a new blog ${newBlog.title} by ${newBlog.author} added`, "success", 5))
		} catch(exception) {
			dispatch(showNotification(exception.response.data.error, "error", 5))
		}

	        resetForm()
	}

	return (
		<div className="BlogForm">
			<h2>Create a new Blog</h2>
			<form onSubmit={addBlog}>
                <Form.Label column sm={2}>
                    Title:
                </Form.Label>
                <input id='input-title'     value={newBlogTitle}     onChange={handleBlogTitleChange}/><br />
                <Form.Label column sm={2}>
                    Author:
                </Form.Label>
                <input id='input-author'    value={newBlogAuthor}    onChange={handleBlogAuthorChange}/><br />
                <Form.Label column sm={2}>
                        URL:
                </Form.Label>
                <input id='input-URL'       value={newBlogURL}       onChange={handleBlogURLChange}/><br />
				<Button id="blog-submit"
                        type="submit"
                        variant="primary">Save
                </Button>
                <Button id="blog-submit"
                        type="reset" 
                        variant="danger"
                        style={{ marginLeft: '10px'}}
                        onClick={resetForm}>Reset
                </Button>
			</form>
		</div>
	)
}

export default BlogForm
