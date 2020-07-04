import { gql } from '@apollo/client'

const BOOK_DETAILS = gql `
	fragment BookDetails on Book {
		title
		published
		author{
			name
		}
		genres
	}
`
export const ALL_AUTHORS = gql`
	query {
		allAuthors {
			name
			born
			bookCount
		}
	}
`
export const ALL_BOOKS = gql`
	query {
		allBooks {
			id
			title
			published
			author{
				name
			}
			genres
		}
	}
`
export const RECOMMENDED_BOOKS = gql`
	query findBooks {
		getBooks {
			title
			published
			author{
				name
			}
			genres
		},
	}
`

export const CREATE_BOOK = gql`
	mutation addBook($title: String!, $author: String!, $published: Int!, $genres: [String!]) {
		addBook(title: $title, author: $author, published: $published, genres: $genres) {
			title
			published
			genres
			author{
				name
			}
		}
	}
`

export const EDIT_AUTHOR = gql`
	mutation editAuthor($name: String!, $setBornTo: Int!) {
		editAuthor(name: $name, setBornTo: $setBornTo)  {
			name
			born
		}
	}
`
export const LOGIN = gql`
	mutation login($username: String!, $password: String!) {
		login(username: $username, password: $password)  {
			value
		}
	}
`

export const BOOK_ADDED = gql`
	subscription {
		bookAdded {
			...BookDetails
		}
	}
	${BOOK_DETAILS}
`