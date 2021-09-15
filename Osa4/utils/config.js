require('dotenv').config()

let PORT = 3003
let MONGODB_URI = 'mongodb+srv://hebe:1234@phonebook.cbwrr.mongodb.net/phonebook?retryWrites=true&w=majority'

module.exports = {
    MONGODB_URI,
    PORT
}