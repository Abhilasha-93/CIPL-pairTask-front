import * as React from "react";

//this function runs only at build time
//never runs in browser

export const getStaticProps = async () => {
  //make api request to jsonplaceholder api
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  //convert response in json
  const data = await response.json();

  console.log(data);

  return {
    props: {
      posts: data,
    },
  };
};

type PostsListProps = {
  posts: {
    userId: number;
    id: number;
    title: string;
    body: string;
  }[];
};

const PostsList = (props: PostsListProps) => {
  const { posts } = props;
  return (
    <>
      <h1>Posts...</h1>
      <ul>
        {posts.map((post) => {
          return <li key={post.id}>{post.title}</li>;
        })}
      </ul>
    </>
  );
};
export default PostsList;
