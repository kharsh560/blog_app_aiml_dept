import mongoose from "mongoose";
import { Content } from "../models/content.model.js";
import { Post } from "../models/post.model.js";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Appreciation } from "../models/appreciation.model.js";
import { Comment } from "../models/comment.model.js";
import uploadOntoCloudinary from "../utils/cloudinary.config.js";

/*
Note that the "content" will be generated through TINY-MCE rich-text editor which produces the content in pure HTML. But it will be given to you after doing "JSON.stringify(tinyMceProducedContent)" So the "content" will be solething like this:- 
  \n "<p><span style=\"color: #e03e2d;\">Hello</span> <strong>there nsdjfnojdpo jfob onf obnfonfdff</strong></p>\n<p>&nbsp;</p>\n<div>\n<p><strong>Lorem Ipsum</strong>&nbsp;is simply dummy text of the printing and typesetting industry." \n You can use html-react-parser to parse the content.
  \n Now let's talk about the response you have to give me. \n
*/

// \nNote that the "content" will be generated through TINY-MCE rich-text editor which produces the content in pure HTML. But it will be given to you after doing "JSON.stringify(tinyMceProducedContent)" So the "content" will be solething like this:-
//   \n "<p><span style=\"color: #e03e2d;\">Hello</span> <strong>there nsdjfnojdpo jfob onf obnfonfdff</strong></p>\n<p>&nbsp;</p>\n<div>\n<p><strong>Lorem Ipsum</strong>&nbsp;is simply dummy text of the printing and typesetting industry." \n You can use html-react-parser to parse the content.
//   \n Now let's talk about the response you have to give me. \n

// Code for a Function to Call the GPT API
const generatePostMetadata = async (title, description, content) => {
  // 1. Construct the User Prompt
  const userPrompt = `Blog Title: ${title}\nDescription: ${description}\nContent: ${content}\n 
  \n Please provide response in JSON format having fields "summary" "minutesRead" and "tags". \n 
  The content which you will be getting is in pure HTML form like this: \n
  <p style="text-align: center;"><span style="font-size: 36pt;"><span style="color: #e03e2d;"><strong>Exploring the Depths of AI</strong></span> </span></p> \n
  Just give me the "result" such that, the "result.response.text()" is in this form:- \n 
  {
  "summary": "Post's Summary not more than 450 letters. Don't give me the summary in parsed HTML format. Else just give it in simple text form. ",
  "minutesRead": intValue,
  "tags": [
    "tag_1",
    "tag_2",
    "tag_3",
    "tag_4",
    "tag_5"
  ]
}\n
Ofcourse it will be stringified, but I can simply do  JSON.parse() on it to return the response as object. \n
 :\n1. A short summary of 4 to 6 lines only.\n2. Estimated reading time of the Content (in minutes).\n3. Array of strings of relevant tags telling category of this post.`;

  try {
    // 2. Initialize the Google Generative AI
    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY); // Make sure to set environment variable

    // 3. Select the model
    const model = genAI.getGenerativeModel({ model: "gemini-pro" }); // Or other model name

    // 4. Construct the chat prompt
    const chat = model.startChat({
      generationConfig: {
        temperature: 1,
      },
    });

    // 5. Send the prompt and get response
    const result = await chat.sendMessage(userPrompt);

    const response = result.response.text();
    // console.log("\n Actual response: ", response, "\n");

    // const slicedResponse = response.slice(7, -3);
    const slicedResponse = response
      .trim()
      .replace(/^```|```$/g, "") // Removes surrounding backticks
      .replace(/^json\s*/, ""); // Remove "json" at the start of the response if it exists

    // console.log("\n Type of the slicedResponse: ", typeof slicedResponse), "\n";
    // console.log("\n slicedResponse: ", slicedResponse), "\n";

    // Parse the stringified JSON
    const jsonResponse = JSON.parse(slicedResponse);
    // console.log("\n Json-fied response: ", jsonResponse, "\n");

    return jsonResponse; // Return the parsed JSON

    // try {
    // } catch (jsonError) {
    //   throw new Error("Failed to parse the JSON response.");
    // }
  } catch (error) {
    console.error("Error during API call:", error);
    throw error;
  }
};

const createPost = async (req, res) => {
  try {
    const { title, description, content } = req.body;

    // Step 1: Get the author from req.user (injected by middleware)
    const author = req?.user?._id;

    if (!author) {
      return res.status(401).json({ error: "Unauthorized request!" });
    }

    // console.log("author: ", author);
    // console.log("content: ", content);
    // console.log("description: ", description);
    // console.log("title: ", title);

    if (
      [title, description, content].some(
        (field) =>
          field?.trim() === "" ||
          field?.trim() === null ||
          field?.trim() === undefined
      )
    ) {
      return res.status(400).json({ error: "All fields are required!" });
    }

    // Step 3: Generate metadata using OpenAI
    const { summary, minutesRead, tags } = await generatePostMetadata(
      title,
      description,
      content
    );

    // console.log("summary: ", summary);
    // console.log("minutesRead: ", minutesRead);
    // console.log("tags: ", tags);

    if (!summary || !minutesRead || !tags) {
      // return res.status(400).json({ error: "Missing responses from LLM" });
      console.log(
        "Missing responses from LLM. Saved without summary, minutesRead and tags."
      );
    }

    // Step 2: Save the content in the Content model
    // console.log("content: ", content);
    // console.log("content type: ", typeof content);

    const newContent = new Content({ postContent: content }); // Assuming `text` is the content field
    const savedContent = await newContent.save();
    const contentId = savedContent._id; // Get the generated content ID

    // get the poster local path.
    // const posterUrlLocalPath = req.file?.path;
    const posterUrlLocalPath = req.file?.path;
    // console.log(posterUrlLocalPath);
    // if (!posterUrlLocalPath) {
    //   return res.status(400).json({ error: "Missing poster image" });
    // }
    let posterUrl = "";
    // I have set the avatar as "not required". So will proceed with the cloudinary service only if posterUrlLocalPath is present with us.
    if (posterUrlLocalPath) {
      posterUrl = await uploadOntoCloudinary(posterUrlLocalPath);
      // Dekho, diya hee nahi agar user ne avatar, fir toh koi baat nahi. But agar diya...
      // ...and upload karte samay dikkat aa gayi, then we must abort and send error.
      if (!posterUrl) {
        return res
          .status(400)
          .json({ error: "Error while uploading avatar to cloudinary." });
      }
    }

    // Step 4: Create the post in the Post model
    const newPost = new Post({
      title,
      description,
      posterUrl: posterUrl.url,
      content: contentId, // The contentId serves as the reference to the Content document in the Content collection. Mongoose will handle the relationship between the Post and Content models for you.
      author, // As -> author = req.user._id;
      summary,
      minutesRead,
      tags,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // Step 5: Save the post to the database
    await newPost.save();

    // Step 6: Respond to the client
    res.status(201).json({
      message: "Post created successfully",
      post: newPost,
    });
  } catch (error) {
    console.error("Error saving post:", error);
    res.status(500).json({
      message: "Failed to save post",
      error: error.message,
    });
  }
};

const getPost = async (req, res) => {
  // const postId = req.params; -> Wrong!!
  const postId = req.params.postId;
  const userId = req.body?._id;
  // console.log("getPost userId: ", userId);

  // or:- const { postId } = req.params;

  if (!postId) {
    return res.status(400).json({ error: "Missing postId" });
  }

  try {
    // Fetch the post from the database

    // Using aggregation directly in place of "populate()"
    // const queriedPost = await Post.findById(postId)
    //   .populate({
    //     path: "content", // Populate the content field
    //     select: "postContent", // Only include 'postContent' field from Content schema
    //   })
    //   .populate({
    //     path: "author", // Populate the author field
    //     select: "name email avatarUrl", // Include only the name and email fields
    //   });

    // Check if the post is liked by this user
    let isLikedByThisUser = false; // Default to false
    if (userId) {
      isLikedByThisUser =
        (await Appreciation.countDocuments({
          appreciatedBy: userId,
          postId: postId,
        })) > 0;
    }

    const queriedPost = await Post.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(req.params.postId),
        },
      }, // So we have the post of whose postId is given in the params. Ab iss data mei we have to add in comments and views
      {
        $lookup: {
          from: "appreciations",
          localField: "_id",
          foreignField: "postId",
          as: "likes",
        },
      }, // So, now we have all the Docs of "views DB's" jinmei "postId" jo h wo params mei diye hue id ke barabar hai.
      {
        $lookup: {
          from: "comments",
          localField: "_id",
          foreignField: "postId",
          as: "comments",
          pipeline: [
            {
              $lookup: {
                from: "users",
                localField: "commentedBy",
                foreignField: "_id",
                as: "commentedBy",
                pipeline: [
                  {
                    $project: {
                      _id: 1,
                      name: 1,
                      avatarUrl: 1,
                    },
                  },
                ],
              },
            },
          ],
        },
      }, // So, now we have all the Docs of "comment DB's" jinmei "postId" jo h wo params mei diye hue id ke barabar hai.
      // Ok, so ab apne ko return karna hai "likesCount" and "comments ka array"
      {
        $lookup: {
          from: "users",
          localField: "author",
          foreignField: "_id",
          as: "author",
        },
      },
      {
        $unwind: "$author", // Ensure the author field is a single object
      },
      {
        $lookup: {
          from: "contents", // The name of the comments collection
          localField: "content",
          foreignField: "_id",
          as: "content",
        },
      },
      {
        $unwind: "$content", // Ensure the content field is a single object
      },
      {
        $lookup: {
          from: "posts",
          let: { currentAuthor: "$author._id", currentPostId: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ["$author", "$$currentAuthor"] }, // Match same author
                    { $ne: ["$_id", "$$currentPostId"] }, // Exclude the current post
                  ],
                },
              },
            },
            {
              $project: {
                title: 1,
                description: 1,
                posterUrl: 1,
                createdAt: 1,
                minutesRead: 1,
                likesCount: 1,
              },
            },
          ],
          as: "otherPostsByThisPostAuthor",
        },
      },
      {
        $addFields: {
          likesCount: {
            $size: "$likes",
          },
          // comments: "$comment",
        },
      },
      {
        // $project: {
        //   _id: 1,
        //   title: 1,
        //   description: 1,
        //   posterUrl: 1,
        //   content: 1,
        //   author: 1,
        //   summary: 1,
        //   minutesRead: 1,
        //   tags: 1,
        //   likesCount: 1,
        //   comments: 1,
        // },
        $project: {
          _id: 1,
          title: 1,
          description: 1,
          posterUrl: 1,
          content: "$content.postContent", // Include only 'postContent' from content
          author: {
            _id: "$author._id",
            name: "$author.name",
            email: "$author.email",
            avatarUrl: "$author.avatarUrl",
          },
          summary: 1,
          minutesRead: 1,
          tags: 1,
          likesCount: 1,
          comments: 1,
          otherPostsByThisPostAuthor: 1,
        },
      },
    ]);

    // Check if post exists
    if (!queriedPost || queriedPost.length === 0) {
      return res.status(404).json({ error: "No post found with that postId!" });
    }

    // Return the post if found
    return res.status(200).json({
      message: "Post retrieved successfully!",
      queriedPost: queriedPost[0],
      isLikedByThisUser,
    });
  } catch (err) {
    // Handle any errors during the query process
    return res
      .status(500)
      .json({ error: "An error occurred while retrieving the post!" });
  }
};

const getUserPosts = async (req, res) => {
  try {
    const userId = req.user._id; // Extract the logged-in user's ID from the request object

    // // Find posts where the author matches the logged-in user's ID
    // const posts = await Post.find({ author: userId })
    //   .populate("content", "postContent") // Populate the 'content' field to include postContent
    //   .populate("author", "name email avatarUrl") // Optionally populate author's name and email
    //   .exec();

    // // Respond with the posts
    // return res.status(200).json({
    //   success: true,
    //   data: posts,
    // });

    const posts = await Post.aggregate([
      {
        $match: {
          author: new mongoose.Types.ObjectId(userId),
        },
      },
      // Step 1: Fetch all posts
      {
        $lookup: {
          from: "users", // Populate author field from the users collection
          localField: "author",
          foreignField: "_id",
          as: "author",
        },
      },
      {
        $unwind: "$author", // Unwind the author array (since lookup returns an array)
      },
      {
        $lookup: {
          from: "appreciations", // Lookup likes related to each post
          localField: "_id",
          foreignField: "postId",
          as: "likes",
        },
      },
      {
        $addFields: {
          likesCount: { $size: "$likes" }, // Add a new field 'likesCount' with the size of the likes array
        },
      },
      {
        $project: {
          _id: 1,
          title: 1,
          description: 1,
          posterUrl: 1,
          summary: 1,
          minutesRead: 1,
          tags: 1,
          createdAt: 1,
          updatedAt: 1,
          author: { name: 1, email: 1, avatarUrl: 1 }, // Include only the necessary fields from the author
          likesCount: 1, // Include the calculated likesCount
          // Add content if required in the future
        },
      },
    ]);

    // Respond with the aggregated posts
    return res.status(200).json({
      success: true,
      data: posts,
    });
  } catch (error) {
    console.error("Error fetching posts by author:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch posts by author",
    });
  }
};

// const getAllPosts = async (req, res) => {
//   try {
//     // Fetch all posts from the database
//     const posts = await Post.find()
//     .populate("author", "name email avatarUrl") // Optionally populate author's name and email
//     .exec();

//     // .populate("content", "postContent") // Populate the 'content' field to include postContent -> content not needed as of now.

//     // Respond with all posts
//     return res.status(200).json({
//       success: true,
//       data: posts,
//     });
//   } catch (error) {
//     console.error("Error fetching all posts:", error);
//     return res.status(500).json({
//       success: false,
//       message: "Failed to fetch posts",
//     });
//   }
// };

const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.aggregate([
      // Step 1: Fetch all posts
      {
        $lookup: {
          from: "users", // Populate author field from the users collection
          localField: "author",
          foreignField: "_id",
          as: "author",
        },
      },
      {
        $unwind: "$author", // Unwind the author array (since lookup returns an array)
      },
      {
        $lookup: {
          from: "appreciations", // Lookup likes related to each post
          localField: "_id",
          foreignField: "postId",
          as: "likes",
        },
      },
      {
        $addFields: {
          likesCount: { $size: "$likes" }, // Add a new field 'likesCount' with the size of the likes array
        },
      },
      // Step 2: Sort posts by likesCount in descending order
      {
        $sort: {
          likesCount: -1, // Sort by likesCount in descending order (-1 for descending, 1 for ascending)
        },
      },
      {
        $project: {
          _id: 1,
          title: 1,
          description: 1,
          posterUrl: 1,
          summary: 1,
          minutesRead: 1,
          tags: 1,
          createdAt: 1,
          updatedAt: 1,
          author: { name: 1, email: 1, avatarUrl: 1 }, // Include only the necessary fields from the author
          likesCount: 1, // Include the calculated likesCount
          // Add content if required in the future
        },
      },
    ]);

    // Respond with the aggregated posts
    return res.status(200).json({
      success: true,
      data: posts,
    });
  } catch (error) {
    console.error("Error fetching all posts:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch posts",
    });
  }
};

const deletePost = async (req, res) => {
  const userIdWhoWantsToDeleteThePost = req.user._id.toString();
  const postIdWhichIsToBeDeleted = req.body.postId;

  // console.log("userIdWhoWantsToDeleteThePost: ", userIdWhoWantsToDeleteThePost.toString());
  // console.log("postIdWhichIsToBeDeleted: ", postIdWhichIsToBeDeleted);

  if (!userIdWhoWantsToDeleteThePost || !postIdWhichIsToBeDeleted) {
    return res
      .status(400)
      .json({ error: "Missing data in order to delete the post." });
  }

  try {
    const requestedPostToBeDeletedInDB = await Post.findById(
      postIdWhichIsToBeDeleted
    );

    if (!requestedPostToBeDeletedInDB) {
      return res.status(404).json({ error: "Post not found." });
    }

    if (
      requestedPostToBeDeletedInDB.author.toString() !==
      userIdWhoWantsToDeleteThePost
    ) {
      return res.status(403).json({
        error:
          "Unauthorised access: User not authorised to delete the requested post.",
      });
    }

    const postDeletion = await Post.findByIdAndDelete(postIdWhichIsToBeDeleted);

    // Deleting the other post related docs: content, likes and comments, after confirming that the post has been deleted.
    // if (!postDeletion) {
    //   return res
    //   .status(404)
    //   .json({ error: "Post deletion unsuccessful. Post not found or, is already deleted." });
    // }
    // else {
    //   await Content.findByIdAndDelete(requestedPostToBeDeletedInDB.content.toString());
    //   await Comment.deleteMany({ postId: postIdWhichIsToBeDeleted });
    //   await Appreciation.deleteMany({ postId: postIdWhichIsToBeDeleted });
    //   return res
    //   .status(200)
    //   .json({ message: "Post and related metadata(content, likes and comments) deleted successfully." });
    // }

    // More improved version of this logic:-

    if (!postDeletion) {
      return res.status(404).json({
        error:
          "Post deletion unsuccessful. Post not found or is already deleted.",
      });
    }

    // Proceed with deleting related data
    let contentDeleted = true;
    let commentsDeleted = true;
    let appreciationsDeleted = true;

    try {
      await Content.findByIdAndDelete(
        requestedPostToBeDeletedInDB.content.toString()
      );
    } catch {
      contentDeleted = false;
    }

    try {
      await Comment.deleteMany({ postId: postIdWhichIsToBeDeleted });
    } catch {
      commentsDeleted = false;
    }

    try {
      await Appreciation.deleteMany({ postId: postIdWhichIsToBeDeleted });
    } catch {
      appreciationsDeleted = false;
    }

    // Respond with detailed results
    const response = {
      message: "Post deleted successfully.",
      contentDeleted: contentDeleted,
      commentsDeleted: commentsDeleted,
      appreciationsDeleted: appreciationsDeleted,
    };

    return res.status(200).json(response);

    // const contentDeletion = await Content.findByIdAndDelete(requestedPostToBeDeletedInDB.content.toString());

    // if (postDeletion && contentDeletion) {
    //   return res.status(200).json({ message: "Post and Content deleted successfully." });
    // }
    // else if (postDeletion && !contentDeletion) {
    //   return res
    //     .status(404)
    //     .json({ error: "Post deleted successfully. But content not found or is already deleted." });
    // }
    // else if (!postDeletion && contentDeletion) {
    //   return res.status(404).json({
    //     error:
    //       "Content deleted successfully. But Post not found or is already deleted.",
    //   });
    // }
    // else {
    //   return res
    //     .status(404)
    //     .json({ error: "Post & Content, both not found or already deleted." });
    // }
  } catch (error) {
    return res.status(500).json({ error: "Error deleting the post!" });
  }
};

const editPost = async (req, res) => {
  try {
    const { postId } = req.params; // Get the post ID from the request params
    const { title, description, content } = req.body;

    // console.log(title);
    // console.log(description);
    // console.log(content);

    // Step 1: Validate input
    if (
      [title, description, content].every(
        (field) => field?.trim() === "" || field === null || field === undefined
      ) &&
      !req.file?.path
    ) {
      return res.status(400).json({
        error: "At least one field must be provided to update the post!",
      });
    }

    // Step 2: Fetch the post to be updated
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ error: "Post not found!" });
    }

    // Ensure the user is authorized to edit the post
    if (String(post.author) !== String(req.user._id)) {
      return res.status(403).json({ error: "Unauthorized action!" });
    }

    // Step 3: Update the content if provided
    if (content) {
      const existingContent = await Content.findById(post.content);

      if (!existingContent) {
        return res.status(404).json({ error: "Content not found!" });
      }

      existingContent.postContent = content;
      await existingContent.save();
    }

    // Step 4: Handle poster update if a new file is provided
    const posterUrlLocalPath = req.file?.path;
    let posterUrl = post.posterUrl;

    if (posterUrlLocalPath) {
      const uploadedPoster = await uploadOntoCloudinary(posterUrlLocalPath);

      if (!uploadedPoster) {
        return res
          .status(400)
          .json({ error: "Error while uploading poster to Cloudinary." });
      }

      posterUrl = uploadedPoster.url;
      post.posterUrl = posterUrl;
    }

    // Step 5: Update the post fields
    // Update title if present
    if (title) {
      post.title = title;
    }

    // Update description if present
    if (description) {
      post.description = description;
    }

    post.updatedAt = new Date();

    // Save the updated post
    await post.save();

    // Step 6: Respond to the client
    res.status(200).json({
      message: "Post updated successfully",
      post,
    });
  } catch (error) {
    console.error("Error editing post:", error);
    res.status(500).json({
      message: "Failed to edit post",
      error: error.message,
    });
  }
};

export { createPost, getPost, getUserPosts, getAllPosts, deletePost, editPost };
