import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

class LocalStorageMock {
    constructor() {
        this.store = {}
    }

    clear() {
        this.store = {}
    }

    getItem(key) {
        return this.store[key] || null
    }

    setItem(key, value) {
        this.store[key] = String(value)
    }

    removeitem(key) {
        delete this.store[key]
    }
}
global.localStorage = new LocalStorageMock()
localStorage.setItem('loggedBlogappUser', {username: "hebe00", token: "test"})

test('renders author and title', () => {
    const blog = {
        author: 'Emil Hellberg',
        title: 'Test blog 1',
        url: 'https://localhost:3003',
        likes: 5
    }

    const component = render(
        <Blog blog={blog} />
    )

    expect(component.container).toHaveTextContent(
        'Test blog 1 Emil Hellberg'
    )
})

test('url and likes are rendered after pressing button', () => {
    const blog = {
        author: 'Emil Hellberg',
        title: 'Test blog 1',
        url: 'https://localhost:3003',
        likes: 5
    }

    const component = render(
        <Blog blog={blog} />
    )

    const button = component.getByText('view')
    fireEvent.click(button)

    expect(component.container).toHaveTextContent(
        'Test blog 1 Emil Hellberg url: http://localhost:3003/api/blogs likes: 5 '
    )
})

test('event handler is called the right amount of times', () => {
    const blog = {
        author: 'Emil Hellberg',
        title: 'Test blog 1',
        url: 'https://localhost:3003',
        likes: 5
    }

    const mockHandler = jest.fn()

    const component = render(
        <Blog blog={blog} />
    )

    const button1 = component.getByText('view')
    fireEvent.click(button1)

    const button2 = component.getByText('like')
    fireEvent.click(button2)
    fireEvent.click(button2)
    expect(mockHandler.mock.calls).toHaveLength(2)
})

test('event handler is called with right parameters', () => {
    //add implementation
})