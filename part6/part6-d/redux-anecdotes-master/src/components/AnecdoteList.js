import React from 'react'
import { connect } from 'react-redux'
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

const Anecdotes = (props) => {
	const vote = (anecdote) => {
		props.voteAnecdote(anecdote.id)
		props.showNotification(anecdote.content, 5)
	}

	return(
		<div>
			<h2>Anecdotes</h2>
			{props.anecdotes.map(anecdote =>
				<Anecdote key={anecdote.id}
					anecdote={anecdote}
					handleClick={()=>vote(anecdote)}
				/>
			)}
		</div>
	)
}

const mapStateToProps = (state) => {
	if ((state.filter === '') || (state.filter === undefined)){
		return {
			anecdotes:	state.anecdotes,
			filter:		state.filter
		}
	}
	return {
		anecdotes: 	state.anecdotes.filter(anecdote => { return anecdote.content.indexOf(state.filter) !== -1 }),
		filter:		state.filter
	}
}

const mapDispatchToProps = { voteAnecdote, showNotification, hideNotification }

const connectedAnecdotes = connect(mapStateToProps, mapDispatchToProps)(Anecdotes)

export default connectedAnecdotes
