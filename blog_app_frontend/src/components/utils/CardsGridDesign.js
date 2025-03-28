import React from "react";
// import { blogPosts } from "./blogPages/blogData";
import BlogCard from "../blogPages/BlogCard";
import { useNavigate } from "react-router-dom";
// import useAllPostData from "./useAllPostData";

const CardsGridsDesign = ({data, pageTitle}) => {
    // console.log(data);
  const navigate = useNavigate();
//   const allPostData = useAllPostData();
//   console.log("hi"  + allPostData);
    const handleCardClick = (project_id) => {
      // console.log("I got clicked.");
      // console.log(project_id);
      navigate(`/all-posts/${project_id}`);
    };  
  return (
    <div className="min-h-screen bg-gray-100 py-12 rounded-md">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">{pageTitle}</h1>

        {/* Masonry Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data?.map((post) => (
            <BlogCard
              key={post._id}
              post={post}
              onClick={() => handleCardClick(post?._id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CardsGridsDesign;
