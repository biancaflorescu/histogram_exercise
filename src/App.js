import "./App.css";
import Header from "./components/header/header";
import Histogram from "./components/histogram/histogram";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://fakerql.goosfraba.ro/graphql",
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Header />
      <Histogram width={1500} height={500} />
    </ApolloProvider>
  );
}

export default App;
