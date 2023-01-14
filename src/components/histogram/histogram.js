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

  const monthsCounter = {
    Jan: 0,
    Feb: 0,
    Mar: 0,
    Apr: 0,
    May: 0,
    Jun: 0,
    Jul: 0,
    Aug: 0,
    Sep: 0,
    Oct: 0,
    Nov: 0,
    Dec: 0,
  };

  data.allPosts.map((post) => {
    const date = new Date(Number(post.createdAt));

    if (date.getFullYear() === 2019) {
      const month = date.toLocaleString("en-US", { month: "short" });
      console.log(month);
      if (monthsCounter.hasOwnProperty(month)) {
        monthsCounter[month]++;
      }
    }
  });

  console.log(monthsCounter);

  return (
    <>
      <div>{JSON.stringify(data)}</div>;
    </>
  );
};

export default Histogram;
