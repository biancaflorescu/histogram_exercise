import { gql } from "@apollo/client";

const POSTS = gql`
  query getPosts {
    allPosts(count: 50) {
      id
      createdAt
    }
  }
`;

const Histogram = () => {
  return <div></div>;
};

export default Histogram;
