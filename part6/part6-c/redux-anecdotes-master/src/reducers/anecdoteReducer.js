import anecdoteService from '../services/anecdotes'

const anecdoteReducer = (state = [], action) => {
	console.log('state now: ', state)
	console.log('action', action)

	switch(action.type)
	{
		case 'VOTE':	const id = action.data.id
				const anecdoteToChange = state.find(n => n.id === id)
				const changedAnecdote = { 
					...anecdoteToChange, 
					votes: anecdoteToChange.votes + 1 
				}
				let returnArray = state.map(anecdote => anecdote.id !== id ? anecdote : changedAnecdote)
				returnArray.sort((a, b) => {
					return (b.votes-a.votes)
				})

				return returnArray
		case 'CREATE':	return [...state, action.data]
		case 'INIT':	return action.data				
		default:	return state
	}

}

export const createAnecdote = (content) => {
	return async dispatch => {
		const newAnecdote = await anecdoteService.createNew(content)
		dispatch({
			type: 'CREATE',
			data: newAnecdote,
		})
	}
}

export const voteAnecdote = (id) => {
	return async dispatch => {
		const anecdoteToChange = await anecdoteService.getAnecdote(id)
		const anecdoteToSend = {...anecdoteToChange, votes: anecdoteToChange.votes+1 }
		const anecdoteResponse = await anecdoteService.vote(anecdoteToSend)
		const anecdoteID = anecdoteResponse.id
		dispatch({
			type: 'VOTE',
			data: {id},
		})
	}
}

export const initializeAnecdotes = (anecdotes) => {
	return async dispatch => {
		const anecdotes = await anecdoteService.getAll()
		dispatch({
			type: 'INIT',
			data: anecdotes,
		})
	}
}

export default anecdoteReducer