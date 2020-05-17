import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

test('renders content', () => {
  const blog = {
        title: "React patterns", 
        author: "Michael Chan", 
        url: "https://reactpatterns.com/", 
        likes: 7,
        user: "5ea767d254627a377038717d"
    }

  const component = render(
    <Blog blog={blog} />
  )

  expect(component.container).toHaveTextContent("React patterns")
  expect(component.container).toHaveTextContent("Michael Chan")
  expect(component.container).not.toHaveTextContent("https://reactpatterns.com/")
  expect(component.container).not.toHaveTextContent("7")
})

test('clicking the button calls event handler once', () => {
    const blog = {
        title: "React patterns", 
        author: "Michael Chan", 
        url: "https://reactpatterns.com/", 
        likes: 7,
        user: "5ea767d254627a377038717d"
    }

    const component = render(
        <Blog blog={blog}/>
    )

    const button = component.getByText('view')
    fireEvent.click(button)

  expect(component.container).toHaveTextContent("React patterns")
  expect(component.container).toHaveTextContent("Michael Chan")
  expect(component.container).toHaveTextContent("https://reactpatterns.com/")
  expect(component.container).toHaveTextContent("7")
})

test('clicking the like button twice calls event handler twice', () => {
    const blog = {
        title: "React patterns", 
        author: "Michael Chan", 
        url: "https://reactpatterns.com/", 
        likes: 7,
        user: "5ea767d254627a377038717d"
    }
    const addLikeMockHandler = jest.fn()

    const component = render(
        <Blog blog={blog} addLike={addLikeMockHandler} />
    )

    const viewButton = component.getByText('view')
    fireEvent.click(viewButton)

    const LikeButton = component.getByText('like')
    fireEvent.click(LikeButton)
    fireEvent.click(LikeButton)

    expect(addLikeMockHandler.mock.calls).toHaveLength(2)
})
