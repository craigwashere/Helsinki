import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { showNotification, hideNotification } from '../reducers/NotificationReducer'

const Anecdote = ({ anecdote, handleClick }) => {
	return(
		<div>
			<div>{anecdote.content}</div>
			<div>has {anecdote.votes}
				<button onClick={handleClick}>vote</button>
			</div>
		</div>
	)
}

const Anecdotes = () => {
	const dispatch = useDispatch()
	const anecdotes = useSelector(({filter, anecdotes}) => {
		if ((filter === '') || (filter === undefined)){
			return anecdotes
		}
		return anecdotes.filter(anecdote => { return anecdote.content.indexOf(filter) !== -1 })
	})

	const vote = (anecdote) => {
		dispatch(voteAnecdote(anecdote.id))
		dispatch(showNotification(anecdote.content, 5))
//		setTimeout(() => { dispatch(hideNotification())}, 5000)
	}

	return(
		<div>
			<h2>Anecdotes</h2>
			{anecdotes.map(anecdote =>
				<Anecdote key={anecdote.id}
					anecdote={anecdote}
					handleClick={()=>vote(anecdote)}
				/>
			)}
		</div>
	)
}

export default Anecdotes