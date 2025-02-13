import React, { useState } from "react";
import { BookOpen } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import maitLogo from "../assets/mait_logo.png";
import { useDispatch } from "react-redux";
import { login } from "../reduxStateManagementFiles/authSlice";
import { useNotification } from "./utils/NotificationProvider";

function SignUpPage() {
  const [enrolment, setEnrolment] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [image, setImage] = useState(null);

  const { showNotification } = useNotification();

  const navigate = useNavigate();

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const signUpHandler = async (e) => {
    e.preventDefault();
    // If any of the fields are empty, alert the user
    if (
      [enrolment, email, name, password, confirmPassword].some(
        (field) =>
          field?.trim() === "" ||
          field?.trim() === null ||
          field?.trim() === undefined
      )
    ) {
      // alert("Please fill all the fields! Profile picture is optional though!");
      showNotification(
        "error",
        "Please fill all the fields! Profile picture is optional though!"
      );
      return;
    }
    // If the passwords do not match, alert the user
    if (password !== confirmPassword) {
      // alert("Passwords do not match!");
      showNotification("error", "Passwords do not match!");
      return;
    }

    // Create FormData instance
    const formData = new FormData();
    // These names in the quotes are the same, which is present in backend's "const { name, enrollment, email, password } = req.body;"
    formData.append("enrollment", enrolment); 
    formData.append("email", email);
    formData.append("name", name);
    formData.append("password", password);
    formData.append("avatar", image); // I guess its the same name as the one in the backend in userRoutes "avatar"

    try {
        const response = await fetch(
          "http://64.227.140.158:4800/api/v1/user/register",
          {
            method: "POST",
            body: formData,
          }
        );

        if (!response) {
            console.log("Failed to sign up");
            return;
        }

        console.log("response: ", response);

        const jsonResponse = await response.json();

        console.log("jsonResponse: ", jsonResponse);

        if(!jsonResponse) {
            console.log("Failed to convert response to JSON");
        }

        if (response.ok) {
            alert("Sign up successful!");
            setEnrolment("");
            setEmail("");
            setName("");
            setPassword("");
            setConfirmPassword("");
            setImage(null);
            showNotification(
              "success",
              "You signed up successfully! Please login now!"
            );
            navigate("/signin");
        }
    } catch (error) {
      showNotification("error", "Something went wrong! Please try again!");
      console.error("Error during sign up:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen mb-5 ">
      <div className="p-5 flex flex-col items-center">
        <img src={maitLogo} alt="MAIT Logo" className="w-16 "></img>
        <h2 className="mt-4 text-3xl font-bold text-gray-800 text-center">
          Welcome to the Official BLOG App of MAIT's AI&ML Department!
        </h2>
      </div>
      <div className="mx-auto w-full max-w-lg rounded-xl p-10 bg-white shadow-lg border border-gray-200">
        <div className="mb-4 flex justify-center">
          <BookOpen width="80" className="text-blue-500" />
        </div>
        <h2 className="text-center text-3xl font-semibold text-gray-800">
          Create your account!
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Already have an account?&nbsp;
          <Link
            to="/signin"
            className="font-medium text-blue-600 hover:underline"
          >
            Sign In
          </Link>
        </p>
        <form className="mt-6">
          <div className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Enrolment Number
              </label>
              <input
                id="Enrolment"
                type="Enrolment"
                onChange={(e) => setEnrolment(e.target.value)}
                placeholder="Enter your enrolment number"
                className="mt-1 w-full rounded-md border border-gray-300 p-2 text-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 w-full rounded-md border border-gray-300 p-2 text-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <input
                id="Name"
                type="Name"
                placeholder="Enter complete name as per college records"
                onChange={(e) => setName(e.target.value)}
                className="mt-1 w-full rounded-md border border-gray-300 p-2 text-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 w-full rounded-md border border-gray-300 p-2 text-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Confirm Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="Confirm your password"
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="mt-1 w-full rounded-md border border-gray-300 p-2 text-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
              />
            </div>
            <div>
              <label
                htmlFor="image"
                className="block text-sm font-medium text-gray-700 "
              >
                Select profile picture
              </label>
              <div className="mt-1 flex items-center space-x-4">
                <input
                  type="file"
                  id="image"
                  name="image"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="block w-full text-sm text-gray-500 border-2 rounded-lg
                                file:mr-4 file:py-2 file:px-4
                                file:rounded-md file:border-0
                                file:text-sm file:font-semibold
                                file:bg-indigo-100 file:text-indigo-700
                                hover:file:bg-indigo-200"
                />
              </div>
            </div>
            <button
              type="submit"
              onClick={(e) => signUpHandler(e)}
              className="w-full rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-200"
            >
              Sign Up
            </button>
            <p className="mt-2 text-center text-sm text-gray-600">
              Don&apos;t want to sign up? &nbsp;
              <Link
                to="/"
                className="font-medium text-blue-600 hover:underline"
              >
                Go back to Home
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUpPage;
