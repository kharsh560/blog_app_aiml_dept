import { useEffect, useState } from "react";
import RTE from "./RTE.js";
import DescriptionTitleImageForms from "./DescriptionTitleImageForms.js";
import Loader from "./Loader.js";
import { useNavigate } from "react-router-dom";
import { useNotification } from "../utils/NotificationProvider.js";
import PublisingLoader from "./LoaderForPublishing.js";

const AddPost = () => {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isPublishing, setIsPublishing] = useState(false);

  const { showNotification } = useNotification();

  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, [3000]);
  }, []);

  const publishBlog = async (e) => {
    e.preventDefault();
    setIsPublishing(true);
    // console.log(JSON.stringify(content));
    // console.log(content);

    if (
      [content, title, description, image].some(
        (field) => field === "" || field === null || field === undefined
      )
    ) {
      setIsPublishing(false);
      showNotification("error", "All fields are required!");
      return;
    }

    //   if (!image) {
    //     setIsLoading(false);
    //     showNotification("error", "Please select an image!");
    //     return;
    //   }

    // setIsLoading(true);

    // Create FormData instance
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content); // Now we're not stringifying! Means: JSON.stringify(content)
    formData.append("description", description);
    formData.append("poster", image); // Append the file

    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/api/v1/post/createPost`,
        {
          method: "POST",
          credentials: "include",
          body: formData, // Send FormData directly
        }
      );

      // console.log("response: ", response);

      const result = await response.json();

      // console.log("result: ", result);

      if (!result) {
        // console.log("Failed to create post.");
        showNotification("error", "Failed to create post.");
        return;
      }

      if (result.message === "Post created successfully") {
        setContent("");
        setTitle("");
        setDescription("");
        setImage(null);
        setIsPublishing(false);
        showNotification("success", "Your blog is published successfully!");
        navigate(`/all-posts/${result.post?._id}`);
      }
    } catch (error) {
      showNotification("error", "Failed to publish blog!");
      setIsPublishing(false);
      // console.log("Failed to create post:", error);
    }
  };

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
            <RTE setContent={setContent} />
          </div>
          <div className="mx-2">
            <DescriptionTitleImageForms
              setDescription={setDescription}
              setImage={setImage}
              setTitle={setTitle}
              publishBlog={publishBlog}
            />
          </div>
        </div>
      </div>
    );
  }
};

export default AddPost;