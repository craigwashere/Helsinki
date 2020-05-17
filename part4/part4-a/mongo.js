/* mongoDB  user:fullstack
            pass: kfepwbo01V5T86UK
node mongo.js kfepwbo01V5T86UK "Arto Vihavainen" 040-1234556
mongodb+srv://fullstack:<password>@cluster0-nbdus.mongodb.net/test?retryWrites=true&w=majority
*/
/*
***** Exercises 3.12 - *****
*/

const mongoose = require('mongoose')

if ( process.argv.length < 3 ) {
	console.log('too few arguments')
	process.exit(1)
}

const password  = process.argv[2]
const newName   = process.argv[3]
const newNumber = process.argv[4]

const url = `mongodb+srv://fullstack:${password}@cluster0-nbdus.mongodb.net/test?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

const personSchema = new mongoose.Schema({
	name: String,
	number: String,
})

const Person = mongoose.model('Person', personSchema)

if ( process.argv.length === 3 ) {
	Person.find({}).then(result => {
		result.forEach(person => {
			console.log(person)
		})
		mongoose.connection.close()
	})
}
else
{
	const person = new Person({
		'name': newName,
		'number': newNumber,
	})

	person.save().then(response => {
		console.log(`added ${newName} number ${newNumber} to phonebook`)
		mongoose.connection.close()
		response.json(response)
	})
}
