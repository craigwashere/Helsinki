import { useLazyQuery } from '@apollo/client'
import { RECOMMENDED_BOOKS } from '../queries'
import React, { useState, useEffect }from 'react'

const Recommended = (props) => {
    const [books, setBooks] = useState([])
	const [getBooks, bookResult] = useLazyQuery(RECOMMENDED_BOOKS, {
    onCompleted: data => {
      console.log('data ', data);
      setBooks(data)
    }})
    
	useEffect(() => {
        if (!props.show) {
            return
        }
        
		if (bookResult.data) {
			console.log("bookResult.data", bookResult.data)
			setBooks(bookResult.data.getBooks)
		}
        getBooks()
	}, [props.show, bookResult.data])

	if (!props.show) {
		return null
	}
    
    
	if (bookResult.loading)  {
		return <div>loading...</div>
	}
	return (
		<div>
			<h2>Recommendations</h2>
			<h3>books in your favorite genre</h3>
			<table>
				<tbody>
					<tr>
						<th></th>
						<th>author</th>
						<th>published</th>
					</tr>
					{books.map(a =>
						<tr key={a.title}>
							<td>{a.title}</td>
							<td>{a.author.name}</td>
							<td>{a.published}</td>
						</tr>
					)}
				</tbody>
			</table>
		</div>
	)
}

export default Recommended