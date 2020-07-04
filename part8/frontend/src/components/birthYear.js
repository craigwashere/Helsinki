import { useMutation, useQuery } from '@apollo/client'
import { EDIT_AUTHOR, ALL_AUTHORS } from '../queries'
import React, { useState, useEffect } from 'react'

const BirthYear = (props) => {
	const [author, setAuthor] = useState('')
	const [birthyear_box, setBirthYear] = useState('')

	const [editAuthor] = useMutation(EDIT_AUTHOR, {
        onError: (error) => { props.setError(error.graphQLErrors[0].message)},
        updateQuery: {ALL_AUTHORS}
    })
	const result = useQuery(ALL_AUTHORS)


	useEffect(() => {
		if (result.data){
            setAuthor(result.data.allAuthors[0].name)
		}
	}, [result.data])

	if (result.loading)  {
		return <div>loading...</div>
	}

	const authors = result.data.allAuthors

	const submit = async (event) => {
		event.preventDefault()

		const setBornTo = parseInt(birthyear_box)
        const name = author
        
		editAuthor({ variables: { name, setBornTo } })

		setBirthYear('')
		setAuthor('')
	}

    const updateSelect = (event) => {
        console.log("event.target.value",event.target.value)
        setAuthor(event.target.value)
    }
	return (
		<div>
			<form onSubmit={submit}>
				<div>
					<label>author:
						<select value = {authors[0].name} onChange={updateSelect}>
							{authors.map(a =>
								<option value={a.name}  key={a.name}>{a.name}</option>
							)}
						</select>
					</label>
				</div>
				<div>
					year born:
					<input type='number' value={birthyear_box} onChange={({ target }) => setBirthYear(target.value)} />
				</div>
				<button type='submit'>update author</button>
			</form>
		</div>
	)
}

export default BirthYear