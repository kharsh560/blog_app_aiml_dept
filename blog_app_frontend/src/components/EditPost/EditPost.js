import { useEffect, useState } from "react";
import RTE from "./RTE.js";
import DescriptionTitleImageForms from "./DescriptionTitleImageForms.js";
import Loader from "./Loader.js";
import { useLocation, useNavigate } from "react-router-dom";
import { useNotification } from "../utils/NotificationProvider.js";
import PublisingLoader from "./LoaderForPublishing.js";
import parse from "html-react-parser";

// { prevContent, prevTitle, prevDescription }
const EditPost = () => {
  const location = useLocation();
  const { postId, prevContent, prevTitle, prevDescription, prevPosterUrl } =
    location.state || {}; // Destructure the passed state

  // console.log("Previous Content:", prevContent);
  // console.log("Previous Title:", prevTitle);
  // console.log("Previous Description:", prevDescription);

  // const parsedPrevContent = parse(prevContent);
  // console.log("Previous Content, parsed:", parsedPrevContent);

  const [content, setContent] = useState(prevContent);
  const [title, setTitle] = useState(prevTitle);
  const [description, setDescription] = useState(prevDescription);
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isPublishing, setIsPublishing] = useState(false);

  const { showNotification } = useNotification();

  const [checked, setChecked] = useState({
    description: false,
    title: false,
    content: false,
    image: false,
  });

  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, [3000]);
  }, []);

  const publishBlog = async (e) => {
    e.preventDefault();
    // setIsPublishing(true);
    // console.log("Dummy Updating blog");
    // setTimeout(() => {
    //   setIsPublishing(false);
    // }, 2000);

    // Create FormData instance
    const formData = new FormData();

    if (checked.title) {
      if (title === "" || title === null || title === undefined) {
        // console.log("You selected title, but its empty!");
        showNotification("error", "You choose title but its empty!");
      } else {
        // console.log("Title appended!", title);
        formData.append("title", title);
      }
    }

    if (checked.content) {
      if (content === "" || content === null || content === undefined) {
        // console.log("You selected content, but its empty!");
        showNotification("error", "You choose content but its empty!");
      } else {
        // console.log("Content appended!", content);
        formData.append("content", content);
      }
    }

    if (checked.description) {
      if (
        description === "" ||
        description === null ||
        description === undefined
      ) {
        // console.log("You selected description, but its empty!");
        showNotification("error", "You choose description but its empty!");
      } else {
        // console.log("Description appended!", description);
        formData.append("description", description);
      }
    }

    if (checked.image) {
      if (image === "" || image === null || image === undefined) {
        // console.log("You selected image, but its empty!");
        showNotification("error", "You choose image but its empty!");
      } else {
        // console.log("Image appended!");
        formData.append("poster", image);
      }
    }

    // console.log("formData entries: \n");
    // for (const [key, value] of formData.entries()) {
    //   console.log(`${key}:`, value);
    // }
    setIsPublishing(true);

    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/api/v1/post/editPost/${postId}`,
        {
          method: "PATCH",
          credentials: "include",
          body: formData, // Send FormData directly
        }
      );

      // console.log("response: ", response);

      if (!response.ok) {
        throw new Error("Something went wrong, please try again!")
      }

      const result = await response.json();

      // console.log("result: ", result);

      if (!result) {
        // console.log("Failed to create post.");
        return;
      }

      if (result.message === "Post updated successfully") {
        // setContent("");
        // setTitle("");
        // setDescription("");
        // setImage(null);
        setIsPublishing(false);
        showNotification("success", "Your blog is published successfully!");
        navigate(`/all-posts/${postId}`);
      }
    } catch (error) {
      showNotification("error", `Failed to publish blog! ${error}`);
      setIsPublishing(false);
      // console.log("Failed to create post:", error);
    }
  };
  //   NOTE: TODO: I need to setup multer for image upload in the backend and then send the image as a formdata object.

  if (isPublishing) {
    return (
      <div className="h-[80vh] w-screen flex justify-center items-center">
        <PublisingLoader />
      </div>
    );
  } else {
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
          className={
            isLoading ? "hidden" : "flex justify-center w-full h-[80vh]"
          }
        >
          <div className="mx-2">
            <RTE setContent={setContent} content={content} />
          </div>
          <div className="mx-2">
            <DescriptionTitleImageForms
              setDescription={setDescription}
              setImage={setImage}
              image={image}
              setTitle={setTitle}
              publishBlog={publishBlog}
              prevDescription={description}
              prevTitle={title}
              prevPosterUrl={prevPosterUrl}
              checked={checked}
              setChecked={setChecked}
            />
          </div>
        </div>
      </div>
    );
  }
};

export default EditPost;
