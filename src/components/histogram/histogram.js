import { useQuery, gql } from "@apollo/client";

const POSTS = gql`
  query getPosts {
    allPosts(count: 50) {
      id
      createdAt
    }
  }
`;

const Histogram = () => {
  const { loading, error, data } = useQuery(POSTS);

  if (loading) return "Loading...";

  if (error) return `Error! ${error.message}`;

  return <div>{JSON.stringify(data)}</div>;
};

export default Histogram;
