import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Outlet } from "react-router-dom";

import Navbar from "./components/headersAndFooters/Navbar.js";
import Home from "./components/Home.js";
import AllPost from "./components/AllPost";
import MyPosts from "./components/MyPosts";
import AddPost from "./components/AddPost/AddPost.js";
import BlogDetail from "./components/blogPages/BlogDetail.js";
import SignInPage from "./components/SignInPage.js";
import { Provider, useDispatch, useSelector } from "react-redux";
import store from "./reduxStateManagementFiles/store.js";
import { login } from "./reduxStateManagementFiles/authSlice.js";
import NotificationProvider from "./components/utils/NotificationProvider.js";
import About from "./components/About/About.js";
import Footer from "./components/About/Footer.js";
import SignUpPage from "./components/SignUpPage.js";
import EditPost from "./components/EditPost/EditPost.js";

const Layout = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  useEffect(() => {
    const checkSession = async () => {
      if (!isLoggedIn) {
        try {
          // console.log("Checking for session!");
          const response = await fetch(
            `${process.env.REACT_APP_BASE_URL}/api/v1/user/checkSession`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
              credentials: "include", // Required for cookies in cross-origin requests
            }
          );

          if (response.ok) {
            const jsonResponse = await response.json();
            dispatch(login(jsonResponse.user)); // Populate Redux store
          }
        } catch (error) {
          // console.log("Failed to rehydrate session:", error);
        }
      }
    };
    checkSession();
  }, [isLoggedIn, dispatch]);

  return (
    <div className="min-h-screen flex flex-col p-4 bg-gray-100">
      <Navbar />
      <main className="flex-grow mt-3">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <NotificationProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="all-posts" element={<AllPost />} />
              <Route path="all-posts/:id" element={<BlogDetail />} />{" "}
              {/* Corrected path */}
              <Route path="my-posts" element={<MyPosts />} />
              <Route path="add-post" element={<AddPost />} />
              <Route path="about" element={<About />} />
              <Route path="edit-post/:id" element={<EditPost />} />
            </Route>
            <Route path="/signin" element={<SignInPage />} />
            <Route path="/signup" element={<SignUpPage />} />
          </Routes>
        </Router>
      </NotificationProvider>
    </Provider>
  </React.StrictMode>
);
