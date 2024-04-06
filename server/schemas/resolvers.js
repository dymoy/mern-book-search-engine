/**
 * @file resolvers.js
 * Define the query and mutation functionality to work with the Mongoose models
 */

const { User, Book } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
    Query: {
        users: async () => {
            return User.find().populate('books');
        },
        user: async (parent, { username }) => {
            return User.findOne({ username }).populate('books');
        },
        me: async (parent, args, context) => {
            if (context.user) {
                return User.findOne({ _id: context.user._id }).populate('books');
            } 
            throw AuthenticationError;
        }
    }, 

    Mutation: {
        login: async (parent, { email, password }) => {
            // Check if the email exists in the database 
            const user = await User.findOne({ email });

            if (!user) {
                throw AuthenticationError;
            }

            // Validate that the password is correct 
            const isPwCorrect = await user.isCorrectPassword(password);

            if (!isPwCorrect) {
                throw AuthenticationError;
            }

            // Return token and user 
            const token = signToken(user);
            return { token, user };
        },

        addUser: async (parent, { username, email, password }) => {
            // Create the user instance and return it with token 
            await User.create({username, email, password});
            const token = signToken(user);
            return { token, user };
        },

        saveBook: async (parent, { bookInput }, context) => {
            // Check authentication infomation in context for the user 
            if (context.user) {
                // Push the new book into the user's savedBooks field array
                const res = await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { $push: { savedBooks: bookInput }},
                    { new: true }
                );
                return res;
            }
            // If the user is not authetnicated, throw AuthenticationError
            throw AuthenticationError;
        },

        removeBook: async (parent, { bookId }) => {
            // Check authentication information in context for the user
            if (context.user) {
                // Pull the book with bookId from the user's savedBooks field array
                const res = await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { $pull: { savedBooks: bookId }},
                    { new: true }
                );
                return res;
            }
            throw AuthenticationError;
        }
    }

}

module.exports = resolvers;