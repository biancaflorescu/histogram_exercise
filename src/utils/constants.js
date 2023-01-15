import { gql } from "@apollo/client";

const POSTS = gql`
  query getPosts {
    allPosts(count: 50) {
      id
      createdAt
    }
  }
`;

const GET_MONTH = (data) => data.month;
const GET_MONTH_VALUE = (data) => data.value;

const VERTICAL_MARGIN = 120;

export { POSTS, GET_MONTH, GET_MONTH_VALUE, VERTICAL_MARGIN };
