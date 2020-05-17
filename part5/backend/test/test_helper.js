const Blog = require('../models/blog')

const initialBlogs = [
        {
            title: "React patterns", 
            author: "Michael Chan", 
            url: "https://reactpatterns.com/", 
            likes: 7,
            user: "5ea767d254627a377038717d"
        }, 
        { 
            title: "Go To Statement Considered Harmful", 
            author: "Edsger W. Dijkstra", 
            url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html", 
            likes: 5,
            user: "5ea767d254627a377038717d"
        }, 
        { 
            title: "Canonical string reduction", 
            author: "Edsger W. Dijkstra", 
            url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html", 
            likes: 12,
            user: "5ea767d254627a377038717d"
        }, 
        { 
            title: "First class tests", 
            author: "", 
            url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll", 
            likes: 10,
            user: "5ea767d254627a377038717d"
        }, 
        { 
            title: "TDD harms architecture", 
            author: "Robert C. Martin", 
            url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html", 
            likes: 0,
            user: "5ea767d254627a377038717d"
        }
]

const nonExistingId = async () => {
	const blog = new Blog({ content: 'willremovethissoon' })
	await blog.save()
	await blog.remove()

	return blog.id.toString()
}

const blogsInDb = async () => {
	const blogs = await Blog.find({})
	return blogs.map(blog => blog.toJSON())
}

module.exports = {  initialBlogs, nonExistingId, blogsInDb }