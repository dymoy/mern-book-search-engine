import './App.css';
import {
	ApolloClient,
	InMemoryCache,
	ApolloProvider,
	createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import Navbar from './components/Navbar';
import { Outlet } from 'react-router-dom';

// Construct main GraphQL API endpoint
const httpLink = createHttpLink({
	uri: '/graphql',
});

// Construct request middleware that will attach the JWT to every request as an 'authorization' header
const authLink = setContext((_, { headers }) => {
	// Check if authentication token exists in local storage and store it 
	const token = localStorage.getItem('id_token');

	// Return the headers to the context so httpLink can read it 
	return {
		headers: {
			...headers,
			authorization: token ? `Bearer ${token}` : '',
		}
	}
});

// Set up the client to execute authLink middleware before making request to GraphQL API
const client = new ApolloClient({
	link: authLink.concat(httpLink),
	cache: new InMemoryCache(),
});

function App() {
	return (
		<ApolloProvider client={client}>
			<Navbar />
			<Outlet />
		</ApolloProvider>
	);
}

export default App;
