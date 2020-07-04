const { ApolloServer, UserInputError, gql, AuthenticationError } = require('apollo-server')
const jwt = require('jsonwebtoken')

const Book	= require('./models/Book')
const Author	= require('./models/Author')
const User	= require('./models/User')

const { PubSub } = require('apollo-server')
const pubsub = new PubSub()

const mongoose = require('mongoose')
mongoose.set('useFindAndModify', false)

const MONGODB_URI = 'mongodb+srv://fullstack:kfepwbo01V5T86UK@cluster0-nbdus.mongodb.net/gql-book?retryWrites=true&w=majority'
const JWT_SECRET = 'NEED_HERE_A_SECRET_KEY'

mongoose.set('useCreateIndex', true)

console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => { console.log('connected to MongoDB') })
	.catch((error) => { console.log('error connection to MongoDB:', error.message) })

const typeDefs = gql`
	type User {
		username:		String!
		id:			ID!
		favoriteGenre:		String!
	}
	type Token {
		value:			String!
	}
	type Book {
		title: 			String!
		published:		Int!
		author: 		Author
		genres: 		[String!]!
		id:	 		ID!
	}
	type Author{
		name:			String!
		born:			Int
		id:			ID!
		bookCount:		Int
	}
	type Query {
		bookCount:		Int!
		allBooks:		[Book!]!
		getBooks(genre: String):[Book!]!
		authorCount:		Int!
		allAuthors:		[Author!]!
		me:			User
	}
	type Mutation {
		addBook(
			title:		String!
			published:	Int!
			author: 	String!
			genres:		[String]
		): Book
		editAuthor(
			name:		String!
			setBornTo:	Int!
		): Author
		createUser(
			username:	String!
		): User
		login(
			username:	String!
			password:	String!
		): Token
	}
	type Subscription {
		bookAdded: Book!
	}
`

const resolvers = {
	Query: {
		bookCount: 	() => Book.collection.countDocuments(),
		allBooks: async	(root, args) => {
			const books = await Book.find({}).populate('author')
			return books
		},
		getBooks: async (root, args, context) => {
			const books = await Book.find({genres: {$in: [context.currentUser.favoriteGenre]}}).populate('author')
			return books
		},
		authorCount: 	() => Author.collection.countDocuments(),
		allAuthors:	() => Author.find({}),
		me: (root, args, context) => {
			return context.currentUser
		}
	},
	Author: {
		bookCount: (root) => Book.collection.countDocuments({author: root._id}),
	},
	Mutation: {
		addBook: async (root, args, context) => {
			console.log("addBook")
			let author = await Author.findOne({name: args.author })
			if (!author) {
				const new_author = new Author( {name: args.author})
				try {
					new_author.save()
					author = new_author
				} catch (error) {
					throw new UserInputError(error.message, { invalidArgs: args, })
				}
			}
			let bookToAdd = new Book({ ...args, author: author._id })

			const currentUser = context.currentUser

			if (!currentUser) {
				throw new AuthenticationError("not authenticated")
			}

			try {
				await bookToAdd.save()
			} catch (error) {
				throw new UserInputError(error.message, { invalidArgs: args, })
			}
			
			bookToAdd.author = author

			pubsub.publish('BOOK_ADDED', { bookAdded: bookToAdd })

			return bookToAdd
		},
		editAuthor: async (root, args, context) => {
			console.log("editAuthor")
			const author = await Author.findOne({ name: args.name })
			author.born = args.setBornTo

			const currentUser = context.currentUser

			if (!currentUser) {
				throw new AuthenticationError("not authenticated")
			}

			try {
				await author.save()
			} catch (error) {
				throw new UserInputError(error.message, { invalidArgs: args, })
			}
			return author
		},
		createUser: (root, args) => {
			console.log("createUser")
			const user = new User({ username: args.username })

			return user.save()
				.catch(error => {
					throw new UserInputError(error.message, { invalidArgs: args, })
				})
		}, 
		login: async (root, args) => {
			console.log("login")
			const user = await User.findOne({ username: args.username })

			if ( !user || args.password !== 'secret' ) {
				throw new UserInputError("wrong credentials")
			}

			const userForToken = {
				username: user.username,
				id: user._id,
			}

			return { value: jwt.sign(userForToken, JWT_SECRET) }
		},
	},
	Subscription: {
		bookAdded: {
			subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
		},
	},
}

const server = new ApolloServer({
	typeDefs,
	resolvers,
	context: async ({ req }) => {
		const auth = req ? req.headers.authorization : null

		if (auth && auth.toLowerCase().startsWith('bearer '))
		{
			const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET)
			const currentUser = await User.findById(decodedToken.id)

			return { currentUser }
		}
	}
})

server.listen().then(({ url, subscriptionsUrl }) => {
	console.log(`Server ready at ${url}`)
	console.log(`Subscriptions ready at ${subscriptionsUrl}`)
})
