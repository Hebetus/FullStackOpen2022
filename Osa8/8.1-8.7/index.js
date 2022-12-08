const { ApolloServer, gql, UserInputError } = require('apollo-server')
const { UniqueDirectiveNamesRule } = require('graphql')
const { v1: uuid } = require('uuid')

const mongoose = require('mongoose')
const { Book, Author, User } = require('./library-schema')

const jwt = require('jsonwebtoken')

const MONGODB_URI = 'mongodb+srv://databaseurlhere'
const JWT_SECRET = 'NEED_HERE_A_SECRET_KEY'

mongoose.connect(MONGODB_URI)
  .then(() => console.log('connected to database!'))
  .catch((error) => console.log('error connecting to database: ', error.message))

let authors = [
  {
    name: 'Robert Martin',
    id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
    born: 1952,
    bookCount: 2
  },
  {
    name: 'Martin Fowler',
    id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
    born: 1963,
    bookCount: 1
  },
  {
    name: 'Fyodor Dostoevsky',
    id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
    born: 1821,
    bookCount: 2
  },
  { 
    name: 'Joshua Kerievsky', // birthyear not known
    id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
    born: 2000,
    bookCount: 1
  },
  { 
    name: 'Sandi Metz', // birthyear not known
    id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
    born: 2010,
    bookCount: 1
  },
]

let books = [
  {
    title: 'Clean Code',
    published: 2008,
    author: {
      name: 'Robert Martin',
      id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
      born: 1952,
      bookCount: 2
    },
    id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Agile software development',
    published: 2002,
    author: {
      name: 'Robert Martin',
      id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
      born: 1952,
      bookCount: 2
    },
    id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
    genres: ['agile', 'patterns', 'design']
  },
  {
    title: 'Refactoring, edition 2',
    published: 2018,
    author: {
      name: 'Martin Fowler',
      id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
      born: 1963,
      bookCount: 1
    },
    id: "afa5de00-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Refactoring to patterns',
    published: 2008,
    author: { 
      name: 'Joshua Kerievsky', // birthyear not known
      id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
      born: 2000,
      bookCount: 1
    },
    id: "afa5de01-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'patterns']
  },  
  {
    title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
    published: 2012,
    author: { 
      name: 'Sandi Metz', // birthyear not known
      id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
      born: 2010,
      bookCount: 1
    },
    id: "afa5de02-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'design']
  },
  {
    title: 'Crime and punishment',
    published: 1866,
    author: {
      name: 'Fyodor Dostoevsky',
      id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
      born: 1821,
      bookCount: 2
    },
    id: "afa5de03-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'crime']
  },
  {
    title: 'The Demon ',
    published: 1872,
    author: {
      name: 'Fyodor Dostoevsky',
      id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
      born: 1821,
      bookCount: 2
    },
    id: "afa5de04-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'revolution']
  },
]

let favoriteBooks = (genre) => {
    const favoriteBooks = books.filter(book => book.genre === genre)
    return favoriteBooks
}

const typeDefs = gql`
    type User {
      username: String!
      favoriteGenre: String!
      id: ID!
    }
    type Token {
      value: String!
    }
    type Author {
        name: String!
        bookCount: Int!
        id: ID!
        born: Int!
    }
    type Authors {
        content: [Author]!
    }
    type Book {
        title: String!
        published: Int!
        author: Author!
        id: ID!
        genres: [String]!
    }
    type Books {
        content: [Book]!
        length: Int!
        authorCount: Int!
    }
    type Query {
        bookCount: Int!
        authorCount: Int!
        allBooks: [Book]!
        favoriteBooks(genre: String!): [Book]!
        allAuthors: [Author]
        me: User
    }
    type Mutation {
        addBook(
            title: String!
            author: String!
            published: Int!
            genres: [String]!
            token: String!
        ): Book
        editAuthor(
            name: String!
            setBornTo: Int!
            token: String!
        ): Author
        createUser(
          username: String!
          favoriteGenre: String!
        ): User
        login(
          username: String!
          password: String!
        ): Token
    }
`

const resolvers = {
  Query: {
    bookCount: () => books.length,
    authorCount: () => authors.length,
    favoriteBooks: (root, args) => favoriteBooks(args.genre),
    allBooks: () => books,
    allAuthors: () => authors,
    me: (root, args, context) => {
      return context.currentUser
    } 
  },
  Author: {
    name: (root) => root.name,
    bookCount: (root) => root.bookCount,
    id: (root) => root.id
  },
  Authors: {
    content: (root) => root.content
  },
  Book: {
    title: (root) => root.title,
    published: (root) => root.published,
    author: (root) => root.author,
    id: (root) => root.id,
    genres: (root) => root.genres
  },
  Books: {
    content: (root) => root.content,
    length: (root) => root.length,
    authorCount: (root) => root.authorCount
  },
  Mutation: {
    addBook: async (root, args) => {
        const book = new Book({ ...args, id: uuid() })
        try {
          await book.save()
        }
        catch(error) {
          throw new UserInputError(error.message, {
            invalidArgs: args
          })
        }
    },
    editAuthor: async (root, args) => {
        const author = await Author.findOne({ name: args.name })
        author.born = args.born
        try {
          await author.save()
        }
        catch(error) {
          throw new UserInputError(error.message, {
            invalidArgs: args
          })
        }
    },
    createUser: async (root, args) => {
      const user = new User({ ...args, id: uuid() })
      try {
        await user.save()
      }
      catch(error) {
        throw new UserInputError(error.message, {
          invalidArgs: args
        })
      }
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if(!user || args.password !== 'secret') {
        throw new UserInputError('wrong credentials!')
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      }

      return { value: jwt.sign(userForToken, JWT_SECRET) }
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})