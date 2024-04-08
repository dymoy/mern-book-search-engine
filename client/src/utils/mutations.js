/**
 * @file mutations.js
 * This holds the GraphQL queries that will execute the mutations set up using Apollo Server
 */

import { gql } from "@apollo/client";

/**
 * @mutation LOGIN_USER 
 * Executes the loginUser mutation set up using Apollo Server 
 * Returns an object with a JWT and User
 */
export const LOGIN_USER = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
            user {
                _id
                username
            }
        }
    }
`;

/**
 * @mutation ADD_USER 
 * Executes the addUser mutation set up using Apollo Server
 * Returns an object with a JWT and User
 */
export const ADD_USER = gql`
    mutation addUser($username: String!, $email: String!, $password: String!) {
        addUser(username: $username, email: $email, password: $password) {
            token
            user {
                _id
                username
            }
        }
    }
`;

/**
 * @mutation SAVE_BOOK
 * Executes the saveBook mutation set up using Apollo Server
 * Returns a User
 */
export const SAVE_BOOK = gql`
    mutation saveBook($bookInput: BookInput!) {
        saveBook(bookInput: $bookInput) {
            _id
            username
            email 
            bookCount
            savedBooks {
                bookId
                authors
                description
                title
                image
                link
            }
        }
    }
`;

/**
 * @mutation REMOVE_BOOK
 * Executes the removeBook mutation set up using Apollo Server
 * Returns a User 
 */
export const REMOVE_BOOK = gql`
    mutation removeBook($bookId: ID!) {
        removeBook(bookId: $bookId) {
            _id
            username
            email
            bookCount
            savedBooks {
                bookId
                authors
                description
                title
                image
                link
            }
        }
    }
`;
