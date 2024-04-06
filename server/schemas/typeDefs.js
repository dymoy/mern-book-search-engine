/**
 * @file typeDefs.js 
 * Define necessary Query and Mutation types. 
 */

const typeDefs =  `
    type User { 
        _id: ID
        username: String 
        email: String
        bookCount: Int
        books: [Book]!
    }

    type Book { 
        bookId: ID
        authors: [String]
        description: String
        title: String
        image: String
        link: String
    }

    type Auth {
        token: ID! 
        user: User
    }

    type Query { 
        users: [User]
        user(username: String!): User
        me: User
    }

    input BookInput {
        authors: [String]
        description: String
        title: String!
        bookId: String!
        image: String
        link: String
    }

    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        saveBook(bookInput: BookInput): User
        removeBook(bookId: String!): User
    }
`;

module.exports = typeDefs;
