const express = require('express')
const morgan = require('morgan')
const app = express()
require('dotenv').config()
const Person = require('./models/person')
const cors = require('cors')

app.use(cors())
app.use(express.json())
app.use(express.static('build'))

const unknownEndpoint = (request, response) => {
	response.status(404).send({ error: 'unknown endpoint' })
}

morgan.token('body', function (req, res) { return JSON.stringify(req.body) })

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :date :body'))

let persons = [
	{ 
		"name": "Arto Hellas", 
		"number": "040-123456",
		"id": 1
	},
	{ 
		"name": "Ada Lovelace", 
		"number": "39-44-5323523",
		"id": 2
	},
	{ 
		"name": "Dan Abramov", 
		"number": "12-43-234345",
		"id": 3
	},
	{ 
		"name": "Mary Poppendieck", 
		"number": "39-23-6423122",
		"id": 4
	}
]

app.get('/api/persons', (request, response) => {
    Person.find({}).then(persons => {
        response.json(persons.map(person => person.toJSON()))
    })
})

const generateId = () => {
	return Math.round(Math.random() * 50)
}

app.post('/api/persons', (request, response) => {
	const body = request.body

	if ((!body.name) || (!body.number)) {
		return response.status(400).json({ 
			error: 'content missing' 
		})
	}
	
	if (persons.find(person => person.name === body.name)) {
		return response.status(400).json({ 
			error: 'name must be unique' 
		})
	}

	const person = {
		name: 	body.name,
		number:	body.number,
		ID: 	generateId(),
	}

    person.save().then(savedPerson => {
        response.json(savedPerson.toJSON())
    })
})

app.get('/info', (request, response) => {
	const total = persons.length
	response.send('<h1>Phonebook has info for ' + total + ' people</h1><br /> <p>' + new Date() + '</p>')
})

app.get('/api/persons/:id', (request, response) => {
    Person.findById(request.params.id).then(person => {
        response.json(person.toJSON())
    })
})

app.delete('/api/persons/:id', (request, response) => {
    Person.findById(request.params.id).then(person => {
        response.json(person.toJSON())
    })
})

app.use(unknownEndpoint)

const PORT = process.env.PORT
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})