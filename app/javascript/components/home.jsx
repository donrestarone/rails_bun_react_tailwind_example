import React from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";
import { queryClient } from '../queries/client'

export default function Home(props) {

  const retrievePosts = async () => {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/posts",
    );
    return response.data;
  };

  const {
    data: posts,
    error,
    isLoading,
  } = useQuery({queryKey: ["postsData"], queryFn: retrievePosts});

  const DisplayPosts = () => {
    console.log(posts)
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
  

  const mutation = useMutation({
    mutationFn: (newTodo) => {
      return axios.post('/mutations', newTodo, {headers: { 'X-CSRF-Token': props.csrf }})
    },
    onMutate: (variables) => {
      // A mutation is about to happen!
  
      // Optionally return a context containing data to use when for example rolling back
      return { id: 1 }
    },
    onError: (error, variables, context) => {
      // An error happened!
      console.log(`rolling back optimistic update with id ${context.id}`)
    },
    onSuccess: (data, variables, context) => {
      queryClient.setQueryData(["postsData"], (posts) => {
        return [variables, ...(posts || [])];
      });
    },
    onSettled: (data, error, variables, context) => {
      // Error or success... doesn't matter!
    },
  })

  return (
    <div className="container mx-auto px-5">
    <button
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      onClick={() => {
        mutation.mutate({ id: new Date(), title: 'Do Laundry', userId: 1,  body: 'laundry instructions'})
      }}
    >
      run mutation
    </button>
    <p className="text-3xl font-bold underline">Posts</p>
    {DisplayPosts()}
  </div>
  )
}