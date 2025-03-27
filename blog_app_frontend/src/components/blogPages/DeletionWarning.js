import React, { useState, useEffect } from "react";
import { useNotification } from "../utils/NotificationProvider";
import {
  Heart,
  MessageCircle,
  Settings,
  Sparkles,
  Ellipsis,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
const DeletionModal = ({
  isOpen,
  onClose,
  postName,
  likesCount,
  commentLength,
  postId,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [text, setText] = useState("");
  // const [processDelete, setProcessDelete] = useState(false);
  const { showNotification } = useNotification();
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => setIsVisible(true), 10); // Trigger animation
    } else {
      setIsVisible(false); // Hide animation
    }
  }, [isOpen]);

  const matchTypedString = async (text) => {
    if (text === postName) {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BASE_URL}/api/v1/post/deletePost`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include", // Required for cookies in cross-origin requests
            body: JSON.stringify({
              postId: postId,
            }),
          }
        );
        if (response.ok) {
          showNotification("success", "Post Successfully Deleted");
          navigate("/my-posts");
          document.body.classList.remove("overflow-hidden");
        }
      } catch (error) {
        showNotification("failed", "failed to delete Post , Please Retry");
        setText("");
      }
    } else {
      // alert("Typed string didn't matched");
      showNotification("failed", "Typed string didn't matched");
    }
  };

  useEffect(() => {
    if (!isOpen) {
      setText("");
    }
  }, [isOpen]);

  if (!isOpen && !isVisible) return null; // Only render when necessary

  return (
    <div
      className={`fixed inset-0 z-50 bg-black bg-opacity-50 backdrop-blur-sm transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      onClick={onClose}
    >
      {/* Modal container */}
      <div
        className={`fixed bg-white text-black rounded-lg shadow-xl w-11/12 sm:w-2/3 lg:w-1/2 max-h-[80vh] overflow-hidden transform transition-all duration-500 ${
          isVisible
            ? "scale-100 translate-y-0 opacity-100"
            : "scale-95 translate-y-10 opacity-0"
        }`}
        style={{
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)", // Center the modal
          transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)", // Smooth easing
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex justify-between items-center p-4 border-b border-gray-300">
          <h3 className="text-2xl font-bold">Delete {postName}</h3>
          <button
            className="text-gray-600 hover:text-red-600 focus:outline-none"
            onClick={onClose}
          >
            &#10005; {/* Cross Icon */}
          </button>
        </div>
        {/* post details */}
        <div className="flex flex-col items-center justify-center text-center h-full mt-4">
          <h2 className="text-lg font-semibold mb-2">{postName}</h2>
          <div className="flex items-center space-x-4 text-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 sm:w-6 sm:h-6 text-red-500"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
            <p>{likesCount}</p>
            <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6" />
            <span className="text-sm sm:text-base">{commentLength}</span>
          </div>
        </div>

        {/* //input  */}
        <div className="flex flex-col items-center justify-center text-center mt-1">
          <p>To confirm, type "{postName}" in the box below</p>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter text here"
            className="border p-2 rounded w-4/6 mb-5 mt-2"
            onPaste={(event) => {
              event.preventDefault();
              showNotification("Error", "Pasting is not allowed!");
            }}
          />
          {/* <p>You typed: {text}</p> */}
        </div>

        {/* Modal Content */}
        {/* <div className="p-6 overflow-y-auto max-h-[60vh] text-lg">
          <p>Are you sure you want to delete this post?</p>
        </div> */}

        {/* Modal Footer */}
        <div className="flex justify-end gap-4 p-4 border-t border-gray-300">
          <button
            className="px-4 py-2 text-sm text-gray-700 bg-gray-200 rounded hover:bg-gray-300"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 text-sm text-white bg-red-600 rounded hover:bg-red-700"
            onClick={() => {
              console.log("Post Deleted");
              {
                matchTypedString(text);
              }
              // onClose();
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeletionModal;
