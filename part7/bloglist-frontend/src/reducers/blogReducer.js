const blogReducer = (state = [], action) => {
	console.log('blogReducer state now: ', state)
	console.log('blogReducer action', action)

	switch(action.type)
	{
		case 'VOTE':	const id = action.data.id
				const blogToChange = state.find(n => n.id === id)
				const changedBlog = { 
					...blogToChange, 
					likes: blogToChange.likes + 1 
				}
				let returnArray = state.map(blog => blog.id !== id ? blog : changedBlog)
				returnArray.sort((a, b) => {
					return (b.likes-a.likes)
				})
				return returnArray
		case 'COMMENT':	return state.map(blog => blog.id !== action.data.id ? blog : action.data)
						.sort((a, b) => {return (b.likes-a.likes)})
		case 'CREATE':	return [...state, action.data]
		case 'INIT':	return [...action.data].sort((a, b) => (b.likes-a.likes))
		case 'REMOVE':	return state.filter(element => element.id !== action.data.id)
		default:	return state
	}

}

export const addComment = (changedBlog) => {
	return dispatch => {
		dispatch({
			type: 'COMMENT',
			data: {changedBlog},
		})
	}
}

export const createBlog = (newBlog) => {
	return dispatch => {
		dispatch({
			type: 'CREATE',
			data: newBlog,
		})
	}
}

export const initializeBlogs = (blogs) => {
	return dispatch => {
		dispatch({
			type: 'INIT',
			data: blogs,
		})
	}
}

export const likeBlog = (id) => {
	return dispatch => {
		dispatch({
			type: 'VOTE',
			data: { id },
		})
	}
}

export const removeBlog = (id) => {
	return dispatch => {
		dispatch({
			type: 'REMOVE',
			data: { id },
		})
	}
}

export default blogReducer