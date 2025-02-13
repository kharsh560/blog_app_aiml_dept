import React, { useState } from "react";
import { BookOpen } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import maitLogo from "../assets/mait_logo.png";
import { useDispatch } from "react-redux";
import { login } from "../reduxStateManagementFiles/authSlice";
import { useNotification } from "./utils/NotificationProvider";

function SignInPage() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const navigate = useNavigate();

  const { showNotification } = useNotification();

  const submitHandler = async (e) => {
    e.preventDefault();

    // console.log(email);
    // console.log(password);

    try {
      const response = await fetch(
        "http://64.227.140.158:4800/api/v1/user/signin",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include", // Required for cookies in cross-origin requests
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      if (!response.ok) {
        // response.json().then((jsonRes) => {
        //   console.log("errorMessage: ", jsonRes.error);
        //   showNotification("error", jsonRes.error);
        // })
        // return;
        const jsonResponse = await response.json();
        showNotification("error", jsonResponse.error);
        return;
        // console.log("I'm here");
        // console.log(jsonResponse);
        // const errorMessage = jsonResponse.error;
        // console.log("errorMessage: ", errorMessage);
        // throw new Error("Failed to sign in");
      }

      const jsonResponse = await response.json();

      if (jsonResponse) {
        dispatch(login(jsonResponse.user));
      }

      console.log("Sign-in successful:", jsonResponse.user);
      showNotification(
        "success",
        `Hello! Welcome back ${jsonResponse?.user?.name}!`
      );
      navigate("/");
    } catch (error) {
      // showNotification("error", error.message);
      showNotification("error", "Something went wrong! Please try again!");
      console.error("Error signing in:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen ">
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
          Log in to your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Don&apos;t have an account?&nbsp;
          <Link
            to="/signup"
            className="font-medium text-blue-600 hover:underline"
          >
            Sign Up
          </Link>
        </p>
        <form className="mt-6">
          <div className="space-y-4">
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
            <button
              type="submit"
              onClick={submitHandler}
              className="w-full rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-200"
            >
              Sign In
            </button>
            <p className="mt-2 text-center text-sm text-gray-600">
              Don&apos;t want to sign in? &nbsp;
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

export default SignInPage;
