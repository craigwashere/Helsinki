const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const api = supertest(app)

const Blog = require('../models/blog')


beforeEach(async () => {
	await Blog.deleteMany({})

	for (let blog of helper.initialBlogs) {
		let blogObject = new Blog(blog)
		await blogObject.save()
	}
})

test('blogs are returned as json', async () => {
	await api
		.get('/api/blogs')
		.expect(200)
		.expect('Content-Type', /application\/json/)
})

test('verifies that the unique identifier property', async () => {
	const blogsAtStart = await helper.blogsInDb()

	const blogToView = blogsAtStart[0]

	const resultBlog = await api
		.get(`/api/blogs/${blogToView.id}`)
		.expect(200)
		.expect('Content-Type', /application\/json/)

	expect(resultBlog.body).toEqual(expect.objectContaining({
		id: expect.any(String)}))
})

test('a valid blog can be added', async () => {
	const newBlog = { 
            title: "Type wars", 
            author: "Robert C. Martin", 
            url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html", 
            likes: 2,
            user: "5ea767d254627a377038717d"
        }

	await api
		.post('/api/blogs')
		.send(newBlog)
        .set('Authorization', 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3R1c2VyIiwiaWQiOiI1ZWE3NjdkMjU0NjI3YTM3NzAzODcxN2QiLCJpYXQiOjE1ODgwMjk0Nzl9.rEdyGuNwDPBAEitHOiHEhLH8K5v194ObBDjzQh17GB0')
		.expect(201)
		.expect('Content-Type', /application\/json/)

	const blogsAtEnd = await helper.blogsInDb()
	expect(blogsAtEnd.length).toBe(helper.initialBlogs.length + 1)

	const contents = blogsAtEnd.map(n => n.title)
	expect(contents).toContain('Type wars')
})

test('blog without title is not added', async () => {
	const newBlog = { 
            author: "Robert C. Martin", 
            url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html", 
            likes: 2
        }

	await api
		.post('/api/blogs')
		.send(newBlog)
        .set('Authorization', 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3R1c2VyIiwiaWQiOiI1ZWE3NjdkMjU0NjI3YTM3NzAzODcxN2QiLCJpYXQiOjE1ODgwMjk0Nzl9.rEdyGuNwDPBAEitHOiHEhLH8K5v194ObBDjzQh17GB0')
		.expect(400)

	const blogsAtEnd = await helper.blogsInDb()

	expect(blogsAtEnd.length).toBe(helper.initialBlogs.length)
})

test('blog without likes is added with 0 likes', async () => {
	const newBlog = { 
            title: "Type wars", 
            author: "Robert C. Martin", 
            url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html", 
        }

	await api
		.post('/api/blogs')
		.send(newBlog)
        .set('Authorization', 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3R1c2VyIiwiaWQiOiI1ZWE3NjdkMjU0NjI3YTM3NzAzODcxN2QiLCJpYXQiOjE1ODgwMjk0Nzl9.rEdyGuNwDPBAEitHOiHEhLH8K5v194ObBDjzQh17GB0')
		.expect(201)
		.expect('Content-Type', /application\/json/)

	const blogsAtEnd = await helper.blogsInDb()
	expect(blogsAtEnd[blogsAtEnd.length - 1].likes).toBe(0)
})

describe('deletion of a blog', () => {
	test('succeeds with status code 204 if id is valid', async () => {
		const blogsAtStart = await helper.blogsInDb()
		const blogToDelete = blogsAtStart[0]

		await api
			.delete(`/api/blogs/${blogToDelete.id}`)
            .set('Authorization', 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3R1c2VyIiwiaWQiOiI1ZWE3NjdkMjU0NjI3YTM3NzAzODcxN2QiLCJpYXQiOjE1ODgwMjk0Nzl9.rEdyGuNwDPBAEitHOiHEhLH8K5v194ObBDjzQh17GB0')
			.expect(204)

		const blogsAtEnd = await helper.blogsInDb()

		expect(blogsAtEnd.length).toBe(helper.initialBlogs.length - 1)

		const titles = blogsAtEnd.map(r => r.title)
		expect(titles).not.toContain(blogToDelete.content)
	})
})

describe('update a new blog', () => {
	test('succeeds with valid data', async () => {
		const blogsAtStart = await helper.blogsInDb()
		const blogToUpdate = blogsAtStart[4]

	        blogToUpdate.title = "TDD harms architecture";

		await api
			.put(`/api/blogs/${blogToUpdate.id}`)
			.send(blogToUpdate)
			.expect(200)
			.expect('Content-Type', /application\/json/)


		const blogsAtEnd = await helper.blogsInDb()
		expect(blogsAtEnd.length).toBe(helper.initialBlogs.length)

		const titles = blogsAtEnd.map(n => n.title)
		expect(titles).toContain('TDD harms architecture')
	})
})

afterAll(() => {
	mongoose.connection.close()
})