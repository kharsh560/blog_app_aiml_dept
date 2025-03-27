import React, { useState } from "react";

const AddComment = async (requestData) => {
  const apiUrl = `${process.env.BASE_URL}/api/v1/comment/addComment`;

  const res = await fetch(apiUrl, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestData),
  });

  if (res.ok) {
    return await res.json(); // Return the successful response
  } else {
    return { error: `HTTP error! Status: ${res.status}` }; // Return error response
  }
};

export default AddComment;