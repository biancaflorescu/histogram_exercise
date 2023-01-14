# Goosfraba Exercise

## Project Description

A web application that fetches a relevantly-sized list of posts from a mock GraphQL API and displays a chart/histogram representing the number of posts created in each month of 2019.

## Technologies

This project was made using **React**, **Apollo** for **GraphQL API** communication and **VISX**.

## Setup

To run this project, install it locally using npm:

```
$ npm install
$ npm start
```

## Implementation Process

- Define a Query with the necessary fields and run it in the Goosfraba GraphQL Playground at endpoint /graphql

```
query getPosts {
  allPosts(count: 50) {
    id
    createdAt
  }
}
```

- Create a components folder for a Header Component and a Histogram Component and import the components in App.js

- Install the packages **graphql** for parsing GraphQL Queries and **@apollo/client** that contains everything to build our client

```
npm install graphql @apollo/client
```

- Import three symbols we need from the **@apollo/client** in App.js

```
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
```

- Create a new client instance of the **ApolloClient** class and provide the **uri** option with our endpoint **https://fakerql.goosfraba.ro/graphql** and the **cache** option with an **InMemoryCache** instance

```
const client = new ApolloClient({
  uri: "https://fakerql.goosfraba.ro/graphql",
  cache: new InMemoryCache(),
});
```

- Wrap the app's top-level components in the **ApolloProvider** component and pass it the client instance as a prop
