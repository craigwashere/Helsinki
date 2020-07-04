import { useLazyQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'
import React, { useState,useEffect  }from 'react'

const Books = (props) => {
    const [books, setBooks] = useState([])
	const [getBooks, bookResult] = useLazyQuery(ALL_BOOKS, {
		onCompleted: data => {
			setBooks(data)
		}
	})
	const [filter, setFilter] = useState('')

	useEffect(() => {
		if (bookResult.data) {
			setBooks(bookResult.data.allBooks)
		}
	        getBooks()
	}, [bookResult.data])

	if (!props.show) {
		return null
	}

	const booksToSHow = filter	? books.filter(book => book.genres.includes(filter))
                                : books

	const genres = books.map(book => book.genres)
	const genres_in_single_array = []
	genres.forEach(element => element.map(a => genres_in_single_array.push(a)))

	const unique_genre_array = [...new Set(genres_in_single_array)]

	return (
		<div>
			<h2>books</h2>

			<table>
				<tbody>
					<tr>
						<th></th>
						<th>author</th>
						<th>published</th>
					</tr>
					{booksToSHow.map(a =>
						<tr key={a.id}>
							<td>{a.title}</td>
							<td>{a.author.name}</td>
							<td>{a.published}</td>
						</tr>
					)}
				</tbody>
			</table>
			{unique_genre_array.map(a => 
				<button onClick={() => setFilter(a)}
					key = {a}>{a}</button>
			)}
			<button onClick={() => setFilter('')}>all genres</button>
		</div>
	)
}

export default Books