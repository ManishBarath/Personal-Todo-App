import { ApolloClient, InMemoryCache, HttpLink, ApolloLink, from } from '@apollo/client';

const httpLink = new HttpLink({ uri: 'http://localhost:8000/graphql' });

const authLink = new ApolloLink((operation, forward) => {
    const token = localStorage.getItem('authToken');
    
    operation.setContext({
        headers: {
            authorization: token ? `Bearer ${token}` : "",
        }
    });

    return forward(operation);
});

const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: from([authLink, httpLink])
});

export default client;
