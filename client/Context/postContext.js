import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

const PostContext = createContext(); // Empty context created

// provider
const PostProvider = ({ children }) => {
  // Create global state
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);

  // Get Posts
  const getPosts = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get("/post/get-posts");
      setLoading(false);
      setPosts(data?.posts);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // Initial posts
  useEffect(() => {
    getPosts();
  }, []);

  return (
    <PostContext.Provider value={[posts, setPosts]}>
      {children}
    </PostContext.Provider>
  );
};

export { PostContext, PostProvider };
