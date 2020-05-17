describe('Blog app', function() {
    beforeEach(function() {
        cy.request('POST', 'http://localhost:3001/api/testing/reset')
            const user = {
                name: "Test User",
                username: 'testuser',
                password: 'password'
            }
            cy.request('POST', 'http://localhost:3001/api/users/', user)
            cy.visit('http://localhost:3000')
    })

    it('Login from is shown', function() {
        cy.contains('login').click()
        cy.contains('Login')
        cy.contains('username')
        cy.contains('password')
    })

    describe('Login',function() {
        it('succeeds with correct credentials', function() {
            cy.contains('login').click()
            cy.get('#username-input').type('testuser')
            cy.get('#password-input').type('password')
            cy.get('#login-submit').click()
            
            cy.contains('Test User logged in')
        })

        it('fails with wrong credentials', function() {
            cy.contains('login').click()
            cy.get('#username-input').type('testuser')
            cy.get('#password-input').type('garbage')
            cy.get('#login-submit').click()
            
            cy.get('.error')
                .should('contain', 'wrong credentials')
                .and('have.css', 'color', 'rgb(255, 0, 0)')

                /*  Cypress, for some reason, can't find this CSS property
                    I think it's more important it know the color was red
                    as it distinguishes it from a 'success' box             */
                //.and('have.css', 'border-style', 'solid')
                
            cy.get('html').should('not.contain', 'Matti Luukkainen logged in')        })    
    })

    describe.only('When logged in', function() {
        beforeEach(function() {
            cy.login({username: 'testuser', password: 'password'})
        })

        it('A blog can be created', function() {
            cy.contains('new BLOG').click()
            cy.get('#input-title').type('React patterns')
            cy.get('#input-author').type('Michael Chan')
            cy.get('#input-URL').type('https://reactpatterns.com/')
            cy.get('#blog-submit').click()
            
            cy.get('.success')
                .should('contain', 'a new blog React patterns by Michael Chan added')
                .and('have.css', 'color', 'rgb(0, 128, 0)')
        })
        
        it('Like a post', function(){
            cy.createBlog({
                title: 'React patterns',
                author: 'Michael Chan',
                url: 'https://reactpatterns.com/'
            })

            cy.get('#button-verbose').click()
            cy.get('#button-like').click()
            
            cy.get('#div-likes').should('contain', '1')
        })
        
        it('Delete a blog', function(){
            cy.createBlog({
                title: 'React patterns',
                author: 'Michael Chan',
                url: 'https://reactpatterns.com/'
            })
            
            cy.get('#button-deleteBlog').click()
            cy.on('window:confirm', str => true)

            cy.get('.success')
                .should('contain', 'blog deleted')
                .and('have.css', 'color', 'rgb(0, 128, 0)')
        })

        it('Delete a blog from a different user', function(){
            cy.createBlog({
                title: 'React patterns',
                author: 'Michael Chan',
                url: 'https://reactpatterns.com/'
            })
            
            cy.get('#logout-button').click()

            const user = {
                name: "Test User2",
                username: 'user2',
                password: 'pass2'
            }

            cy.request('POST', 'http://localhost:3001/api/users/', user)
            
            cy.login({ username: 'user2', password: 'pass2'})
            cy.get('#button-deleteBlog').click()
            cy.on('window:confirm', str => true)

            cy.get('.error')
                .should('contain', 'something went wrong')
                .and('have.css', 'color', 'rgb(255, 0, 0)')
        })
        
        it.only('check blogs are sorted by Likes', function(){
            cy.createBlog({
                title: 'React patterns',
                author: 'Michael Chan',
                url: 'https://reactpatterns.com/',
                likes: 3
            })
            cy.createBlog({
                title: "Go To Statement Considered Harmful", 
                author: "Edsger W. Dijkstra", 
                url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html", 
                likes: 7
            })
            cy.createBlog({
                title: "Canonical string reduction", 
                author: "Edsger W. Dijkstra", 
                url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html", 
                likes: 12
            })

            cy.get('.blog').within(() => {
                cy.get('#button-verbose').click({ multiple: true })
                cy.get('#div-likes').eq(0).should('contain', 12)
                cy.get('#div-likes').eq(1).should('contain', 7)
                cy.get('#div-likes').eq(2).should('contain', 3)
            })
        })
    })    
})
