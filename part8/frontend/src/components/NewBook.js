import { useMutation, useSubscription, useApolloClient } from '@apollo/client'
import { CREATE_BOOK, ALL_BOOKS, ALL_AUTHORS, BOOK_ADDED } from '../queries'
import React, { useState } from 'react'

const NewBook = (props) => {
	const [title, setTitle] = useState('')
	const [author, setAuhtor] = useState('')
	const [published_box, setPublished] = useState('')
	const [genre, setGenre] = useState('')
	const [genres, setGenres] = useState([])
	const client = useApolloClient()

	const updateCacheWith = (addedBook) => {
		const authorDataInStore = client.readQuery ({ query: ALL_AUTHORS })
		if (!authorDataInStore.allAuthors.find(a => a.name === addedBook.author.name)) {
			const new_author = {	__typename: "Author",
						name: addedBook.author.name,
						born: null,
						bookCount: 1
			}
			client.writeQuery({
				query: ALL_AUTHORS,
				data: {	...authorDataInStore,
					allAuthors: [ ...authorDataInStore.allAuthors, new_author ]
				}
			})
		}

		//Our schema is configured so that each title must be unique
		//which means a new book can't already be in cache, so we
		//shouldn't have to check
//		const includedIn = (set, object) => 
//			set.map(p => p.id).includes(object.id)  

		const dataInStore = client.readQuery({ query: ALL_BOOKS })
//		console.log("includedIn",includedIn(dataInStore.allBooks, addedBook))
//		if (!includedIn(dataInStore.allBooks, addedBook)) {
			console.log("book added")
			client.writeQuery({
				query: ALL_BOOKS,
				data: { allBooks : dataInStore.allBooks.concat(addedBook) }
			})
//		}
	}

	const [createBook] = useMutation(CREATE_BOOK, {
		onError: (error) => { props.setError(error) },
		update: (store, response) => {
/*			const authorDataInStore = store.readQuery ({ query: ALL_AUTHORS })
			if (!authorDataInStore.allAuthors.find(a => a.name === response.data.addBook.author)) {
				const new_author = {	__typename: "Author",
							name: response.data.addBook.author.name,
							born: null,
							bookCount: 1
				}
				store.writeQuery({
					query: ALL_AUTHORS,
					data: {
						...authorDataInStore,
						allAuthors: [ ...authorDataInStore.allAuthors, new_author ]
					}
				})
			}

			const dataInStore = store.readQuery({ query: ALL_BOOKS })
			store.writeQuery({
				query: ALL_BOOKS,
				data: {
					...dataInStore,
					allBooks: [ ...dataInStore.allBooks, response.data.addBook ]
				}
			})
*/			updateCacheWith(response.addBook)
		}
	})

	useSubscription(BOOK_ADDED, {
		onSubscriptionData: ({ subscriptionData }) => {
			const addedBook = subscriptionData.data.bookAdded
			props.setError(`${addedBook.title} added`)
			updateCacheWith(addedBook)
		}
	})

	if (!props.show) {
		return null
	}

	const submit = async (event) => {
		event.preventDefault()

		console.log('add book...')
		const published = parseInt(published_box)

		createBook({ variables: { title, author, published, genres } })

		setTitle('')
		setPublished('')
		setAuhtor('')
		setGenres([])
		setGenre('')
	}

	const addGenre = () => {
		setGenres(genres.concat(genre))
		setGenre('')
	}

	return (
		<div>
			<form onSubmit={submit}>
				<div>
					title
					<input value={title} onChange={({ target }) => setTitle(target.value)} />
				</div>
				<div>
					author
					<input value={author} onChange={({ target }) => setAuhtor(target.value)} />
				</div>
				<div>
					published
					<input type='number' value={published_box} onChange={({ target }) => setPublished(target.value)} />
				</div>
				<div>
					<input value={genre} onChange={({ target }) => setGenre(target.value)} />
					<button onClick={addGenre} type="button">add genre</button>
				</div>
				<div>
					genres: {genres.join(' ')}
				</div>
				<button type='submit'>create book</button>
			</form>
		</div>
	)
}

export default NewBook