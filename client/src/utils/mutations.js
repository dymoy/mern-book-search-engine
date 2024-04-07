/**
 * @file mutations.js
 * This holds the GraphQL queries that will execute the mutations set up using Apollo Server
 */

import { gql } from '@apollo/client';

/**
 * @query LOGIN_USER 
 * Executes the loginUser mutation set up using Apollo Server 
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
 * @query ADD_USER 
 * Executes the addUser mutation set up using Apollo Server
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
 * @query SAVE_BOOK
 * Executes the saveBook mutation set up using Apollo Server
 */
export const SAVE_BOOK = gql`
    mutation saveBook($bookInput: BookInput) {
        saveBook(bookInput: $bookInput) {
            user {
                _id
                username
                email 
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
    }
`;

/**
 * @query REMOVE_BOOK
 * Executes the removeBook mutation set up using Apollo Server
 */
export const REMOVE_BOOK = gql`
    mutation removeBook($bookId: String!) {
        remove_book(bookId: $bookId) {
            user {
                _id
                username
                email
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
    }
`;
