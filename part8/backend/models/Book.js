const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

const schema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
    minlength: 2
  },
  published: {
    type: Number,
  },
  author: {
    type: ObjectId,
    ref: 'Author'
  },
  genres: [
    { type: String}
  ]
});

module.exports = mongoose.model('Book', schema)
