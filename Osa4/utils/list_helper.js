const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    let likes = 0
    blogs.forEach(blog => {
        likes += blog.likes
    })

    return likes
}

const favoriteBlog = (blogs) => {
    let most = 0
    let mostBlog
    blogs.forEach(blog => {
        if (blog.likes > most) {
            most = blog.likes
            mostBlog = blog
        }
    })
    return mostBlog
}

const mostBlogs = (blogs) => {
    const blogsAmount = [
        {
            author: "test",
            amount: 0
        }
    ] 
    blogs.forEach(blog1 => {
        blogsAmount.forEach(blog2 => {
            if (blog1.author === blog2.author) {
                blog2.amount += 1
                return
            }
        })
        blogsAmount.push(
            {
                author: blog1.author,
                amount: 1
            }
        )
    })
    let mostBlog = {
        author: "",
        amount: 0
    }
    blogsAmount.forEach(blog => {
        if (blog.amount > mostBlog.amount) {
            mostBlog = blog
        }
    })

    return mostBlog
}

const mostLikes = (blogs) => {
    const blogsLikes = [
        {
            author: "test",
            likes: 0
        }
    ]
    blogs.forEach(blog1 => {
        blogsLikes.forEach(blog2 => {
            if (blog1.author === blog2.author) {
                blog2.likes += blog1.likes
                return
            }
        })
        blogsLikes.push(
            {
                author: blog1.author,
                likes: blog1.likes
            }
        )
    })
    let mostLikes = {
        author: "",
        likes: 0
    }
    blogsLikes.forEach(blog => {
        if (blog.likes > mostLikes.likes) {
            mostLikes = blog
        }
    })

    return mostLikes
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}