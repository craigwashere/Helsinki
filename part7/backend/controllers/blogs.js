/*   backend controllers blogs*/

const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

blogsRouter.delete('/:id', async (request, response, next) => {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }	

    const user = await User.findById(decodedToken.id)

	const blog = await Blog.findById(request.params.id)

    if ( blog.user.toString() === user._id.toString() ) { 
        blog.remove() 
        response.status(204).end()
    }
    else {
        response.status(401).end()
    }
})

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({}).populate('user', { username: 1, name: 1, id: 1 })

  response.json(blogs.map(blog => blog.toJSON()))
})

blogsRouter.get('/:id', async (request, response, next) => {
    const blog = await Blog.findById(request.params.id)
    if (blog) {
        response.json(blog.toJSON())
    } else {
        response.status(404).end()
    }
})

blogsRouter.post('/', async (request, response, next) => {
	const body = new Blog(request.body)
	const token = request.token
    
    if ((body.title === undefined) || (body.url === undefined) || (body.author === undefined)) {
		return response.status(400).json({ error: 'content missing' })
	}

    if ((body.title === '') || (body.url === '') || (body.author === '')) {
		return response.status(400).json({ error: 'content missing' })
	}

    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!token || !decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }	
  
    const user = await User.findById(decodedToken.id)

    if (body.likes === undefined)
		body.likes = 0

    const blog = new Blog({
            title:  body.title,
            author: body.author,
            url:    body.url,
            likes:  body.likes,
            user:   user._id
    })

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.status(201).json(savedBlog.toJSON())    
})

blogsRouter.put('/:id/comments', async (request, response, next) => {
    const updatedBlog = await Blog.updateOne(
        {_id: request.params.id},
        {$push: { comments:   [ request.body.comment ] } },
        {upsert: true}
    )

    if (updatedBlog.nModified !== 1)
        response.status(404).end()
    else
        response.status(200).end()
})

blogsRouter.put('/:id/likes', async (request, response, next) => {
    const result = await Blog.updateOne(
        {_id: request.params.id},
        {$inc: {likes: 1} }
    )
    
    if (result.nModified !== 1)
        response.status(404).end()
    else
        response.status(200).end()

})

blogsRouter.put('/:id', (request, response, next) => {
	const body = request.body

	const blog = {
		title:	body.title,
		author:	body.author,
		url:	body.url,
		likes:	body.likes,
		user:   body.user.id,
		comments: [...body.comments]
	}

	Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
		.then(updatedBlog => {
			response.json(updatedBlog.toJSON())
		})
		.catch(error => next(error))
})

module.exports = blogsRouter
