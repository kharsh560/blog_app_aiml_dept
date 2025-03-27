import { useEffect, useState } from "react";

const useUserPost = () => {
  const [userPosts, setuserPosts] = useState(null);

  async function getPostsData() {
    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/api/v1/post/getUserPosts`,
      {
        method: "GET",
        credentials: "include", // Sends cookies with the request
      }
    );

    const json = await response.json();
    console.log(":jmd");

    console.log(json);

    setuserPosts(json.data);
  }
  useEffect(() => {
    getPostsData();
  }, []);

  return userPosts;
};

export default useUserPost;
