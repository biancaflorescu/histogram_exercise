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

- Defined a Query with the necessary fields and ran it in the Goosfraba GraphQL Playground at endpoint /graphql

```
query getPosts {
  allPosts(count: 50) {
    id
    createdAt
  }
}
```

- Created a components folder for a Header Component and a Histogram Component and imported them in App.js

- Installed the packages **graphql** for parsing GraphQL Queries and **@apollo/client** that contains everything to build our client

```
npm install graphql @apollo/client
```

- Imported three symbols we need from the **@apollo/client** in App.js

```
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
```

- Created a new client instance of the **ApolloClient** class and provided the **uri** option with our endpoint **https://fakerql.goosfraba.ro/graphql** and the **cache** option with an **InMemoryCache** instance

```
const client = new ApolloClient({
  uri: "https://fakerql.goosfraba.ro/graphql",
  cache: new InMemoryCache(),
});
```

- Wrapped the app's top-level components in the **ApolloProvider** component and passed it the client instance as a prop

- Imported **gql** in histogram.js and created a constant **POSTS** with the value of our Query defined in the first step

- Imported **useQuery** hook in histogram.js and declared 3 destructured constants from this hook: **loading**, **error** and **data**

- Called **useQuery** with **POSTS** query as its argument

- Wrote conditional statements that handle the loading constant and the error state

```
if (loading) return "Loading...";

if (error) return `Error! ${error.message}`;
```

- Displayed the raw data object with **JSON.stringify** to see what we get

```
<div>{JSON.stringify(data)}</div>
```

- Created an object **monthsCounter** that has all the months as keys, each of them with the value of 0. In this object we will store how many posts we have in each month

- Iterated through the raw data object and converted the **createdAt** field from milliseconds to date using JavaScript **Date** object

- Wrote a conditional statement to check only for posts from 2019, got only the month from the full date details and for each month retrieved incremented the value of the correspondent month key in the **monthsCounter** object

```
 data.allPosts.map((post) => {
    const date = new Date(Number(post.createdAt));

    if (date.getFullYear() === 2019) {
      const month = date.toLocaleString("en-US", { month: "short" });
      if (monthsCounter.hasOwnProperty(month)) {
        monthsCounter[month]++;
      }
    }
  });
```

- Wrote console.log() methods to verify if the logic works as expected

- Installed the packages we need from **@visx**: shape, group, scale, axis, gradient

```
$ npm install @visx/shape @visx/group @visx/scale @visx/axis @visx/gradient @visx/responsive
```

- Made a new array of objects from **monthsCounter** entries, each object containing the month name and its value for creating the histogram based on documentation

```
  const histogramData = Object.entries(monthsCounter).map((arr) => {
    return {
      month: arr[0],
      value: arr[1],
    };
  });
```

- Took the code from **VISX** documentation and adapted it to my code

  - I chose a **Bar** shape
  - I changed the data object name with my data object, **histogramData**
  - I changed the names for the axis labels
  - I added width and height props to **Histogram** component in App.js
  - I changed the bound for bottom axis
  - I changed the bar witdh
  - I changed the number of ticks for left axis, **numTicks**

- Made a new folder named **utils** for a constants file and moved the constants from histogram.js there

- Made a new file in **utils** folder, named **helper_functions** and created 2 functions, **boundsHistogram** and **scalesHistogram** where I put the bounds and scales code to reduce the code lines in **Histogram** component for better readability

- Changed the style of the whole page to look aesthetically pleasing

  - Added background color to the page and centered the content
  - Added a new **Bar** that goes from the max value on Y to the current value of a month
  - Added 2 linear gradient backgrounds, one for each **Bar**
  - Removed labels and left axis
  - Changed the font and size of the title
  - Added text with every value of each month on top of the **Bar**,

- Installed **bootstrap** and **react-bootstrap** packages and created a **QueryLoading** Component to render a React-Bootstrap **Spinner** when the query is loading

- Added bar animation and moved it to a new component **BarAnimation**

- Created a **setTimeout** function to load text values on the bars after the animation is finished

- Added gradient color to the title
