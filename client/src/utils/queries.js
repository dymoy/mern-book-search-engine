/**
 * @file queries.js
 * This will hold the query GET_ME, which will execute the me query set up using Apollo Server.
 */

import { gql } from '@apollo/client';

/**
 * @query GET_ME 
 * Executes the me query set up using Apollo Server 
 * Returns a User 
 */
export const GET_ME = gql`
    query me {
        me {
            _id
            username
            email
            bookCount
            savedBooks {
                authors
                bookId
                description
                image
                link
                title
             }
        }
    }
`;
