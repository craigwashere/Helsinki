import React, { useState } from 'react'
import { Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux'
import { likeBlog, removeBlog, addComment as blogReducer_addCommment } from '../reducers/blogReducer'
import { showNotification } from '../reducers/NotificationReducer'
import blogService from '../services/blogs'

const Blog = ({ blog }) => {
	const dispatch = useDispatch()
	const [newComment,      setNewComment]      = useState('')
	const blogStyle = {
		paddingTop: 10,
		paddingLeft: 2,
		border: 'solid',
		borderWidth: 1,
		marginBottom: 5
	}

	const addLike = async () => {
		try {
			await blogService.addLike(blog.id)
			dispatch(likeBlog(blog.id))
			dispatch(showNotification(`you liked ${blog.title} by ${blog.author}`, "success", 5))
		} catch(exception) {
			dispatch(showNotification(exception.response.data.error, "error", 5))
		}
	}

	const deleteBlog = async () => {
		// eslint-disable-next-line no-undef
		if (!window.confirm(`Delete ${blog.title} by ${blog.author}?`))
			return
		try {
			await blogService.remove(blog.id)
			dispatch(removeBlog(blog.id))
			dispatch(showNotification('blog deleted', "success", 5))
		} catch(exception) {
			dispatch(showNotification(exception.toString(), "error", 5))
		}
	}

	const handleCommentChange = (event) => {
		setNewComment(event.target.value)
	}

	const addNewComment = async (event) => {
		event.preventDefault()

		try {
			await blogService.addComment(blog.id, newComment)
			blog.comments = [...blog.comments, newComment]
			await dispatch(blogReducer_addCommment (blog))
			dispatch(showNotification(`comment added`, "success", 5))
		} catch(exception) {
			dispatch(showNotification(exception, "error", 5))
		}

		setNewComment('')
	}

	return (
		<div style = {blogStyle} className='blog'>
			<div>
				<h2>{blog.title} by {blog.author}</h2>
				<a href={blog.url}>{blog.url}</a>
				<hr />
				<div id='div-likes'>
                		likes: {blog.likes}
					<Button id='button-like'
						onClick={addLike} 
						variant="success"
						style={{ marginLeft: '10px'}}
					>like
					</Button>
				</div>
				<hr />
				<div>added by: {blog.user.name}</div>
			</div>
			<div>
				<h3>Comments:</h3>
				{((blog.comments.length !== 0)) ? 
					<ul>{blog.comments.map((comment, index) =>
						<li key={index}>{comment}</li>)}
					</ul> : <em>No comments, yet</em>}
			</div>
			<hr />
			<div className="CommentForm">
				<h3>Add a Comment</h3>
				<form onSubmit={addNewComment}>
					Comment:    <input id='input-comment' value={newComment} onChange={handleCommentChange}/>
					<Button id="commentSubmit"
						variant="primary"
						type="submit"
						style={{ marginLeft: '10px'}}
					>save
					</Button>
				</form>
			</div>
			<hr />
			<div>
				<Button id="deleteBlog"
					variant="danger"
					onClick={deleteBlog}
				>Delete This Blog
				</Button>
			</div>
		</div>
	)
}

export default Blog
