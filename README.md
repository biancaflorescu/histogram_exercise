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

- Create a components folder for a Header Component and a Histogram Component and import the components in the App.js file
