import React, { useEffect } from "react";
import { Menu, X, BookOpen } from "lucide-react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import maitLogo from "../../assets/mait_logo.png";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../reduxStateManagementFiles/authSlice";
import { useNotification } from "../utils/NotificationProvider";

const Navbar = () => {
  const { showNotification } = useNotification();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.userData);
  const isAdmin = userData?.isAdmin;
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  // const urlParameter = useParams();
  // console.log("Url parameter", urlParameter);

  const location = useLocation();
  const currentPath = location.pathname;
  // console.log("path: ", location.pathname);

  // const [isLoggedIn, setIsLoggedIn] = React.useState(isLoggedInFromStore);
  // const [userData, setUserData] = React.useState(userDataFromStore);

  const [isOpen, setIsOpen] = React.useState(false);

  // useEffect(() => {
  //   if (userData) {
  //     // console.log(userData);
  //     setIsLoggedIn(isLoggedInFromStore);
  //   }
  // }, [userData, isLoggedInFromStore]);

  // Update local state when the Redux store changes
  // useEffect(() => {
  //   setIsLoggedIn(isLoggedInFromStore);
  // }, [isLoggedInFromStore]);

  const navigate = useNavigate();

  const signOut = async () => {
    try {
      const response = await fetch(
        "http://localhost:4800/api/v1/user/signout",
        {
          method: "POST", // Assuming the sign-out is a POST request
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include", // Required for cookies in cross-origin requests
          body: JSON.stringify({}), // Empty body if no additional data is needed
        }
      );

      if (!response.ok) {
        throw new Error("Signout failed");
      }

      const result = await response.json();
      console.log("Signout successful", result);
      dispatch(logout());
      // setIsLoggedIn(isLoggedInFromStore);
      // setUserData(userDataFromStore);
    } catch (error) {
      console.error("Error during signout:", error);
    }
  };

  const authButtonHandler = async (buttonContent) => {
    // console.log(buttonContent);
    if (buttonContent === "Sign In") {
      console.log("User wants to sign in");
      navigate("/signin");
    } else if (buttonContent === "Sign Out") {
      console.log("User wants to sign out");
      await signOut();
      navigate("/");
      // console.log("isLoggedIn: ", isLoggedIn);
      // console.log("userData after dispatch(logout()): ", userData);
      // The console.log("isLoggedIn: ", isLoggedIn) and console.log("userData after dispatch(logout()): ", userData) inside the
      // authButtonHandler may still log the stale values of isLoggedIn and userData because
      // React state updates (Redux in this case) are asynchronous.
    }
  };

  // If you want to verify the state updates after dispatch(logout()), consider using a useEffect to watch the Redux state:
  useEffect(() => {
    console.log("isLoggedIn (updated): ", isLoggedIn);
    console.log("userData (updated): ", userData);
    console.log("isAdmin (updated): ", isAdmin);
  }, [isLoggedIn, userData]);

  return (
    <nav className="bg-white shadow-xl w-full z-30 p-4 border border-gray-200 rounded-md">
      {/* style={{ height: "75px" }} h-[75px] -> Isko hataya then only, wo bottom extra margin wala error resolve hua. */}
      <div className=" mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center gap-6 cursor-default">
            <img src={maitLogo} className="w-16 "></img>
            <div className="flex items-center">
              <BookOpen className="h-8 w-8 text-blue-600" />
              <div className=" ml-2 flex flex-col items-center text-base font-bold">
                <p className="relative top-1">AI & ML</p>
                <p className="relative bottom-1">BlogSpace</p>
              </div>
              {/* <span className="ml-2 text-xl font-bold">BlogSpace</span> */}
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/">
              <a
                href="#"
                className={
                  currentPath === "/"
                    ? "text-primary-600 font-bold hover:text-blue-600 transition "
                    : "text-gray-700 hover:text-blue-600 transition"
                }
              >
                Home
              </a>
            </Link>
            <Link to="/all-posts">
              <a
                href="#"
                className={
                  currentPath === "/all-posts"
                    ? "text-primary-600 font-bold hover:text-blue-600 transition "
                    : "text-gray-700 hover:text-blue-600 transition"
                }
              >
                All Posts
              </a>
            </Link>

            {isAdmin ? (
              <Link to="/my-posts">
                <a
                  href="#"
                  className={
                    currentPath === "/my-posts"
                      ? "text-primary-600 font-bold hover:text-blue-600 transition "
                      : "text-gray-700 hover:text-blue-600 transition"
                  }
                >
                  My Posts
                </a>
              </Link>
            ) : null}

            {isAdmin ? (
              <Link to="/add-post">
                <a
                  href="#"
                  className={
                    currentPath === "/add-post"
                      ? "text-primary-600 font-bold hover:text-blue-600 transition "
                      : "text-gray-700 hover:text-blue-600 transition"
                  }
                >
                  Add Post
                </a>
              </Link>
            ) : null}

            <Link to="/about">
              <a
                href="#"
                className={
                  currentPath === "/about"
                    ? "text-primary-600 font-bold hover:text-blue-600 transition "
                    : "text-gray-700 hover:text-blue-600 transition"
                }
              >
                About
              </a>
            </Link>

            <button
              onClick={(e) => authButtonHandler(e.target.textContent)}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
            >
              {/* Sign In */}
              {isLoggedIn ? "Sign Out" : "Sign In"}
            </button>

            {/* <button
              onClick={signOut}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
            >
              Sign Out
            </button> */}

            {isLoggedIn ? (
              <img src={userData?.avatarUrl} className="w-14 rounded-xl" />
            ) : null}
          </div>

          {/* NOTE: Mobile view */}
          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-blue-600"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/"
              onClick={() => setIsOpen(false)}
              className={`block px-3 py-2 ${
                currentPath === "/"
                  ? "text-primary-600 font-bold"
                  : "text-gray-700"
              } hover:text-blue-600`}
            >
              Home
            </Link>
            <Link
              to="/all-posts"
              onClick={() => setIsOpen(false)}
              className={`block px-3 py-2 ${
                currentPath === "/all-posts"
                  ? "text-primary-600 font-bold"
                  : "text-gray-700"
              } hover:text-blue-600`}
            >
              All Posts
            </Link>

            {isAdmin && (
              <Link
                to="/my-posts"
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-2 ${
                  currentPath === "/my-posts"
                    ? "text-primary-600 font-bold"
                    : "text-gray-700"
                } hover:text-blue-600`}
              >
                My Posts
              </Link>
            )}

            {isAdmin && (
              <button
                onClick={() => {
                  showNotification("error", "You can only post on laptops");
                  
                  setIsOpen(false);
                }}
                className="block w-full text-left px-3 py-2 text-gray-700 hover:text-blue-600"
              >
                Add Post
              </button>
            )}

            <Link
              to="/about"
              onClick={() => setIsOpen(false)}
              className={`block px-3 py-2 ${
                currentPath === "/about"
                  ? "text-primary-600 font-bold"
                  : "text-gray-700"
              } hover:text-blue-600`}
            >
              About
            </Link>

            <button
              onClick={(e) => {
                authButtonHandler(e.target.textContent);
                setIsOpen(false);
              }}
              className="w-full text-left px-3 py-2 text-gray-700 hover:text-blue-600"
            >
              {isLoggedIn ? "Sign Out" : "Sign In"}
            </button>

            {isLoggedIn && (
              <img
                src={userData?.avatarUrl}
                className="w-14 rounded-xl mx-3 my-2"
                alt="User avatar"
              />
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;