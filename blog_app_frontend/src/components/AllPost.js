import React, { useEffect, useState } from "react";
import BlogCard from "./blogPages/BlogCard";
import { useNavigate } from "react-router-dom";
import useAllPostData from "./utils/useAllPostData.js";
import CardsGridDesign from "./utils/CardsGridDesign.js";
import Loader from "./GlobalLoader.js";

const AllPost = () => {
  const allPostData = useAllPostData();
  // console.log("hi"  + allPostData);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (allPostData) {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  }, [allPostData]);

  return (
    <div className=" overflow-x-hidden ">
      <div
        className={
          isLoading
            ? "h-screen w-screen flex justify-center items-center"
            : "hidden"
        }
      >
        <Loader />
      </div>
      <div
        className={isLoading ? "hidden" : "flex justify-center w-full h-full"}
      >
        <CardsGridDesign data={allPostData} pageTitle={"All Posts"} />
      </div>
    </div>
  );
};

export default AllPost;
