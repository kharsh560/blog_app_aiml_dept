import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Heart,
  MessageCircle,
  Settings,
  Sparkles,
  Ellipsis,
} from "lucide-react";
import { useSelector } from "react-redux";
import Tooltip from "./Tooltip";
import usePostDetail from "../utils/usePostDetail";
import Modal from "./Modal";
import CommentEditor from "./CommentEditor";
import formatDateTime from "../utils/formatDateTime";
import BlogCard from "./BlogCard";
import AddComment from "../utils/AddComment";
import { useNotification } from "../utils/NotificationProvider";
import Loader from "../GlobalLoader";
import DeletionModal from "./DeletionWarning";

// import { motion, AnimatePresence } from "framer-motion";

const BlogDetail = () => {
  const { showNotification } = useNotification();
  const commentEditorRef = useRef(null);
  const navigate = useNavigate();
  const { id } = useParams();
  const postDetail = usePostDetail(id);
  const [isLoading, setIsLoading] = useState(true);

  // Loader Logic
  useEffect(() => {
    if (postDetail) {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  }, [postDetail]);

  const post = postDetail?.queriedPost;
  // console.log(post);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const { isLoggedIn, userData } = useSelector((state) => state.auth);
  const isAdmin = userData?.isAdmin;
  // console.log("Is logged in: " + isLoggedIn);

  const [isPostLikedByThisUser, setIsPostLikedByThisUser] = useState(null);
  const [likes, setLikes] = useState(null);

  const handleCardClick = (project_id) => {
    // console.log("I got clicked.");
    // console.log(project_id);
    navigate(`/all-posts/${project_id}`);
    // setPostDetail(usePostDetail(project_id));
    setTimeout(() => {
      window.location.reload();
    }, 20);
  };

  const handleLikeButtonClick = async (postId) => {
    async function likeDislikeApi() {
      const response = await fetch(
        "http://localhost:4800/api/v1/appreciation/likeDislike",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            postId,
          }),
        }
      );
      const jsonResponse = await response.json();
      if (jsonResponse.message === "Post liked!") {
        // console.log("likeDislike Button message: ", jsonResponse.message);
        setLikes((prev) => prev + 1);
        setIsPostLikedByThisUser((prev) => !prev);
        showNotification("success", "Post liked!");
      } else {
        // console.log("likeDislike Button message: ", jsonResponse.message);
        setLikes((prev) => prev - 1);
        setIsPostLikedByThisUser((prev) => !prev);
        showNotification("success", "Post disliked!");
      }
    }
    likeDislikeApi();
  };

  // const requestData = {
  //   postId: "678382fff7228de2bbde8294",
  //   comment: "SpaceX 101",
  // };

  const [postComments, setpostComments] = useState(null);

  // useEffect(()=>{
  //   setpostComments(post?.comments)
  // },[post])

  useEffect(() => {
    window.scrollTo(0, 0);
    setLikes(post?.likesCount);
    setIsPostLikedByThisUser(postDetail?.isLikedByThisUser);
    setpostComments(post?.comments.reverse());
  }, [post]);

  // if (!post) {
  //   return <p>Post not found!</p>;
  // }

  const handleFocusCommentEditor = () => {
    // console.log("Focusing CommentEditor");
    if (commentEditorRef.current) {
      commentEditorRef.current.focus(); // Focus the CommentEditor
    }
  };

  //setting button
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const buttonRef = useRef(null);
  const [buttonPosition, setButtonPosition] = useState({ top: 0, right: 0 });
  useEffect(() => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setButtonPosition({
        top: rect.bottom, // Positioning dropdown below the button
        right: rect.right,
      });
    }
  }, []);

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  // const handleEdit = () => {
  //   console.log("Edit clicked");
  //   navigate(`/edit-post/${post?._id}`);
  // };

  const handleEdit = () => {
    // console.log("Edit clicked");
    navigate(`/edit-post/${post?._id}`, {
      state: {
        postId: post?._id,
        prevContent: post?.content,
        prevTitle: post?.title,
        prevDescription: post?.description,
        prevPosterUrl: post?.posterUrl,
      },
    });
  };

  const [isDeletionModalOpen, setIsDeletionModalOpen] = useState(false);
  const handleOpenDeletionModal = () => setIsDeletionModalOpen(true);
  const handleCloseDeletionModal = () => setIsDeletionModalOpen(false);
  // const handleDelete = () => {
  //   console.log("Delete clicked");

  // };

  // console.log(post);

  // NOTE: Many a times, tailwind does not react to react's states like this :-  className={isDeletionModalOpen ? "overflow-y-hidden" : ""}...
  // ...Hence, we need to apply the property using conventional CSS styling only!
  useEffect(() => {
    if (isDeletionModalOpen || isModalOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [isDeletionModalOpen, isModalOpen]);

  return (
    <div>
      <div
        className={
          isLoading
            ? "h-[80vh] w-screen flex justify-center items-center"
            : "hidden"
        }
      >
        <Loader />
      </div>

      <div
        className={isLoading ? "hidden" : "flex justify-center items-center "}
      >
        <DeletionModal
          isOpen={isDeletionModalOpen}
          onClose={handleCloseDeletionModal}
          authorName={post?.author?.name}
          postName={post?.title}
          likesCount={post?.likesCount}
          commentLength={post?.comments?.length}
          postId={post?._id}
        />
        <div
          className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8 `}
        >
          {/* Header */}
          <div className="flex justify-between items-center mb-4 sm:mb-6 lg:mb-8">
            <button
              onClick={() => navigate(-1)}
              className="text-gray-600 hover:text-gray-900"
            >
              ← Back
            </button>
            {isLoggedIn ? (
              userData?._id === post?.author?._id ? (
                <div className="relative">
                  {/* Settings Button */}
                  <button
                    ref={buttonRef}
                    className={`text-gray-600 ${
                      userData?.isAdmin
                        ? "cursor-pointer hover:text-gray-900"
                        : "cursor-not-allowed"
                    }`}
                    onClick={userData?.isAdmin ? toggleDropdown : undefined}
                  >
                    <Settings className="w-5 h-5 sm:w-6 sm:h-6" />
                  </button>

                  {/* Dropdown Menu */}
                  <div
                    className={`absolute transition-all duration-500 ease-in-out transform  ${
                      dropdownOpen
                        ? "opacity-100 scale-100 translate-y-0"
                        : "opacity-0 scale-95 translate-y-2 pointer-events-none"
                    }`}
                    style={{
                      top: `${buttonPosition.top + 25}px`, // Add some space below the button
                      right: `${buttonPosition.right}px`, // Align dropdown to the left of the button
                    }}
                  >
                    <ul className="w-40 bg-white border border-gray-200 rounded-lg shadow-lg py-2">
                      {/* Edit Option */}
                      <li
                        className="px-4 py-2 text-gray-700 cursor-pointer hover:bg-gray-100"
                        onClick={() => {
                          if (window.innerWidth <= 768) {
                            // alert("");
                            showNotification("error", "You cannot edit on a mobile phone.");
                            return;
                          }
                          handleEdit();
                        }}
                      >
                        Edit
                      </li>

                      {/* Delete Option */}
                      <li
                        className="px-4 py-2 text-red-600 cursor-pointer hover:bg-red-100"
                        onClick={handleOpenDeletionModal}
                      >
                        Delete
                      </li>
                    </ul>
                  </div>
                </div>
              ) : (
                <Tooltip message="Not the author" show={true}>
                  <button
                    className={`text-gray-600 cursor-not-allowed`}
                    disabled={true}
                  >
                    <Settings className="w-5 h-5 sm:w-6 sm:h-6" />
                  </button>
                </Tooltip>
              )
            ) : (
              <Tooltip message="Login first" show={!userData?.isAdmin}>
                <button
                  className={`text-gray-600 ${
                    userData?.isAdmin
                      ? "cursor-pointer hover:text-gray-900"
                      : "cursor-not-allowed"
                  }`}
                  disabled={!userData?.isAdmin}
                >
                  <Settings className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
              </Tooltip>
            )}
          </div>
          {/* Post title and author */}
          <div className=" flex flex-col justify-between items-start">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
              {post?.title}
            </h1>
            <h1 className=" flex items-center my-2">
              <span className="opacity-60 mr-1">Author:</span>
              {/* <img
            src={post?.author?.avatarUrl}
            alt={post?.title}
            className="w-10 h-10 object-cover rounded-full shadow-lg mx-2"
          />{" "} */}
              <span className=" font-medium">{post?.author?.name}</span>
            </h1>
          </div>

          {/* Main content: poster, summary+contentButton, comments and otherPostsSection */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 sm:gap-2 lg:gap-4 ">
            {/* Cover Image and Interactions */}
            <div className="lg:col-span-3 space-y-4 h-[65vh]">
              <div className="relative w-full h-full">
                <img
                  src={post?.posterUrl}
                  alt={post?.title}
                  className="w-full h-full object-cover rounded-lg shadow-lg"
                />
              </div>
            </div>
            {/* summary / content / likes / tags */}
            <div className="lg:col-span-2 flex flex-col pb-1 h-[65vh]">
              {/* Summary Section (60%) */}
              <div className="flex-grow-[7] flex flex-col">
                {/* Scrollable Summary Content */}
                <div className="bg-gray-300 sm:p-3 rounded-lg h-0 flex-grow">
                  <div className="flex justify-between">
                    <div className="flex items-center">
                      <h2 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-4 m-2">
                        Summary
                      </h2>
                    </div>
                    <div className="flex items-start">
                      <Sparkles width={16} />
                      <h2 className="text-xs relative top-1">AI generated</h2>
                    </div>
                  </div>
                  <div className="h-[25vh] overflow-y-scroll">
                    <p className="text-gray-600 text-sm sm:text-base m-2">
                      {post?.summary || "Not available!"}
                    </p>
                  </div>
                </div>
                {/* Interaction Buttons */}
                <div className="flex items-center space-x-4 mt-2 sm:mt-2 mb-2 p-1">
                  <Tooltip message="Login first" show={!isLoggedIn}>
                    <button
                      className={`flex items-center space-x-2 text-rose-500 ${
                        isLoggedIn
                          ? "cursor-pointer hover:text-rose-700"
                          : "cursor-not-allowed text-rose-300"
                      }`}
                      onClick={() => handleLikeButtonClick(post?._id)}
                      disabled={!isLoggedIn}
                    >
                      {isPostLikedByThisUser ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-5 h-5 sm:w-6 sm:h-6 text-red-500"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                        </svg>
                      ) : (
                        <Heart className="w-5 h-5 sm:w-6 sm:h-6" />
                      )}
                      <span className="text-sm sm:text-base">{likes}</span>
                    </button>
                  </Tooltip>
                  <Tooltip message="Login first" show={!isLoggedIn}>
                    <button
                      className={`flex items-center space-x-2 text-gray-500 ${
                        isLoggedIn
                          ? "cursor-pointer hover:text-gray-700"
                          : "cursor-not-allowed text-gray-300"
                      }`}
                      disabled={!isLoggedIn}
                      onClick={handleFocusCommentEditor}
                    >
                      <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6" />
                      <span className="text-sm sm:text-base">
                        {post?.comments?.length}
                      </span>
                    </button>
                  </Tooltip>
                </div>
              </div>

              {/* Tags Section (40%) */}
              <div className="flex-grow-[3] flex flex-col">
                {/* Scrollable Tags Content */}
                <div className="bg-gray-300 p-3 rounded-lg h-0 flex-grow ">
                  <div className="flex justify-between">
                    <div className="flex items-center">
                      <h2 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-4">
                        Tags
                      </h2>
                    </div>
                    <div className="flex items-start">
                      <Sparkles width={16} />
                      <h2 className="text-xs relative top-1">AI generated</h2>
                    </div>
                  </div>
                  <div className="overflow-y-auto h-[8vh]">
                    <div className="flex flex-wrap gap-2">
                      {post?.tags?.length > 0 ? (
                        post?.tags?.map((tag) => (
                          <span
                            key={tag}
                            className="bg-gray-200 text-gray-700 text-sm px-2 py-1 rounded-full"
                          >
                            {tag}
                          </span>
                        ))
                      ) : (
                        <p className="text-gray-600 text-sm sm:text-base">
                          Not available!
                        </p>
                      )}
                    </div>
                  </div>
                </div>
                {/* Read More Button */}
                <div className="w-full mt-2">
                  <button
                    type="button"
                    className="w-full text-white bg-[#1D4ED8] hover:bg-[#050708]/90 focus:ring-4 focus:outline-none focus:ring-[#050708]/50 font-medium rounded-lg text-sm px-4 sm:px-5 py-2 sm:py-2.5 text-center inline-flex items-center justify-center"
                    onClick={handleOpenModal}
                  >
                    Read Full Blog Content Here
                  </button>
                  <Modal
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                    content={post?.content}
                    title={post?.title}
                  />
                </div>
              </div>
            </div>

            {/* Comments Section */}
            <div className="lg:col-span-3 h-[60vh]">
              <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6">
                Comments
              </h2>

              {/* Add Comment section */}
              <CommentEditor
                isLoggedIn={isLoggedIn}
                ref={commentEditorRef}
                postComments={postComments}
                setpostComments={setpostComments}
                sentPostId={post?._id}
              />
              {console.log("commentResponse")}

              {postComments?.length > 0 ? (
                <div className="space-y-3 sm:space-y-4 mt-3 bg-slate-200 p-3 h-[36vh] overflow-y-scroll rounded-xl">
                  {postComments?.map((comment) => (
                    <div
                      key={comment._id}
                      className="bg-gray-50 p-3 sm:p-4 rounded-lg"
                    >
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <img
                          src={
                            comment?.commentedBy[0]?.avatarUrl ||
                            comment?.commentedBy?.avatarUrl
                          }
                          alt={post?.author?.name}
                          className="w-6 rounded-full "
                        />
                        <span className="font-medium text-sm sm:text-base">
                          {comment?.commentedBy[0]?.name ||
                            comment?.commentedBy?.name}
                        </span>
                        <span className="text-gray-400">•</span>
                        <span className="text-gray-600 text-xs sm:text-sm">
                          {formatDateTime(comment?.createdAt)}
                        </span>
                      </div>
                      <p className="text-gray-700 text-sm sm:text-base">
                        {comment?.comment}
                      </p>
                    </div>
                  ))}
                  <div className="flex flex-col items-center">
                    {/* <h2 className=" text-slate-700 text-sm font-semibold">
                  The End!
                </h2> */}
                    <Ellipsis />
                  </div>
                </div>
              ) : (
                <p className="text-gray-600 text-sm sm:text-base mt-3">
                  No comments yet. Be the first to comment!
                </p>
              )}
            </div>

            {/* otherPostsByThisAuthor */}
            <div className="lg:col-span-2 h-[60vh]  ">
            {/* */}
              <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 m-11 ml-0  lg:m-0 lg:mb-5">
                {/* NOTE: sm: means in laptops and normal means in mobiles */}
                More posts by {post?.author?.name}
              </h2>
              <div className="h-[59vh] overflow-y-scroll overflow-x-hidden p-4 bg-slate-200 rounded-xl">
                {post?.otherPostsByThisPostAuthor?.map((indvPost) => {
                  return (
                    <div className="bg-white my-2 rounded-lg shadow-md overflow-hidden hover:shadow-2xl hover:scale-[1.02] transition-all duration-150 cursor-default ">
                      <img
                        src={indvPost?.posterUrl}
                        alt={indvPost?.title}
                        className="w-full h-24 object-cover"
                      />
                      <div className="p-4">
                        <h2 className="text-lg font-semibold mb-2">
                          {indvPost?.title}
                        </h2>
                        <div className="flex items-center text-gray-600 text-xs mb-2">
                          <img
                            src={post?.author?.avatarUrl}
                            alt={post?.author?.name}
                            className="w-6 rounded-full mr-2"
                          />
                          <span>{post?.author?.name}</span>
                          <span className="mx-2">•</span>
                          <span>{formatDateTime(indvPost?.createdAt)}</span>
                          <span className="mx-2">•</span>
                          <span>{indvPost?.minutesRead}min read</span>
                        </div>
                        <div className="flex items-center text-rose-500 text-sm mb-3">
                          {/* <span>
                    {post?.likesCount > 0 ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5 text-red-500 mr-1"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                      </svg>
                    ) : (
                      <Heart className="w-4 h-4 mr-1" />
                    )}{" "}
                  </span> */}

                          {/* <span>
                    {" "}
                    {post?.likesCount > 1
                      ? ` ${post?.likesCount} appreciations`
                      : ` ${post?.likesCount} appreciation`}{" "}
                  </span> */}
                        </div>
                        <p className="text-gray-600 mb-4 line-clamp-3">
                          {indvPost?.description}
                        </p>
                        <button
                          className="text-blue-600 hover:text-blue-800 font-medium cursor-pointer"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCardClick(indvPost?._id);
                          }}
                        >
                          Read More →
                        </button>
                      </div>
                    </div>
                  );
                })}
                <div className="flex flex-col items-center">
                  {/* <h2 className=" text-slate-700 text-sm font-semibold">
                The End!
              </h2> */}
                  <Ellipsis />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;
