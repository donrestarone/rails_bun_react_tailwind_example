import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const retrievePosts = async () => {
  const response = await axios.get(
    "https://jsonplaceholder.typicode.com/posts",
  );
  return response.data;
};


const DisplayPosts = () => {
  const {
    data: posts,
    error,
    isLoading,
  } = useQuery({queryKey: ["postsData"], queryFn: retrievePosts});

  if (isLoading) return <div>Fetching posts...</div>;
  if (error) return <div>An error occurred: {error.message}</div>;

  return (
    <ol className="list-disc">
      {posts.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ol>
  );
};

export default () => (
  <div className="container mx-auto px-5">
    <p className="text-3xl font-bold underline">Posts</p>
    {DisplayPosts()}
  </div>
);