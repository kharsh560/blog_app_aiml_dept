import { Student } from "../models/student.model.js";
import { User } from "../models/user.model.js";
import uploadOntoCloudinary from "../utils/cloudinary.config.js";

const registerUser = async (req, res) => {
  // data lo pehle from req
  const { name, enrollment, email, password } = req.body;

  // Pro way to check if any one of the fields is empty or not. If anyone is also empty, throw error!
  if (
    [name, enrollment, email, password].some(
      (field) =>
        field?.trim() === "" ||
        field?.trim() === null ||
        field?.trim() === undefined
    )
  ) {
    return res.status(400).json({ error: "All fields are required!" });
  }

  // first of all see if any "user" with that "email" is already present or not!
  const alreadyExistingUserWithThatEmail = await User.findOne({
    $or: [{ email }, { enrollment }],
  });

  // console.log(alreadyExistingUserWithThatEmail); -> getting this thing null means that we don't have such document with this email and entollment!

  // agar ye email already registered hai, then return with a "conflict" status.
  if (alreadyExistingUserWithThatEmail) {
    return res.status(409).json({
      message:
        "You are already registered. Go to sign in page and click forget password.",
      studentName: alreadyExistingUserWithThatEmail?.name,
    });
  }

  // Ok, now if that user is not registered with us.
  // then check for the "enrollment" to verify if that user is a part of MAIT_B.TECH or not.
  // So, kind of verify the studentData
  const studentData = await Student.findOne({
    $and: [{ enrollment }, { studentName: name.toUpperCase() }],
  });

  if (!studentData) {
    return res.status(400).json({
      error:
        "Sorry! Your name and/or enrollment is not yet registered in our MAIT_B.Tech_student's_database. Contact developers!",
    });
  }

  // Now, we are sure that the student is registered in MAIT_B.Tech_student's_database.
  // Start registering the user now!

  // check if the user is admin
  let isAdmin = false;
  if (studentData.enrollment.slice(0, 6) == "admin_") {
    isAdmin = true;
  }

  // get the avatar local path.
  const avatarLocalPath = req.file?.path;
  let avatarURL = "";
  // I have set the avatar as "not required". So will proceed with the cloudinary service only if avatarLocalPath is present with us.
  if (avatarLocalPath) {
    avatarURL = await uploadOntoCloudinary(avatarLocalPath);
    // Dekho, diya hee nahi agar user ne avatar, fir toh koi baat nahi. But agar diya...
    // ...and upload karte samay dikkat aa gayi, then we must abort and send error.
    if (!avatarURL) {
      return res
        .status(400)
        .json({ error: "Error while uploading avatar to cloudinary." });
    }
  }

  // avatar aa gaya. Ab simply user ko create kar do mongoDB mei.

  const documentedUser = await User.create({
    name,
    avatarUrl: avatarURL.url,
    email,
    password,
    enrollment,
    isAdmin,
  });

  if (!documentedUser) {
    return res.status(500).json({
      error: "Something went wrong while registering the user!",
    });
  }

  // Its(documentedUser) a single object, having key-value pairs.
  const documentedUserWithoutPassAndToken = {};
  const documentedUserObject = documentedUser.toObject();
  for (const key in documentedUserObject) {
    if (key !== "password" && key !== "refreshToken") {
      documentedUserWithoutPassAndToken[key] = documentedUserObject[key];
    }
  }

  console.log(
    "User created successfully! Details of created user: ",
    documentedUserWithoutPassAndToken
  );

  return res.status(201).json({
    message: "User created successfully!",
    user: documentedUserWithoutPassAndToken,
  });
};

// Note: Pass in here, the queriedUser, and not  "User"!
const generateAccessAndRefereshTokens = async (user) => {
  try {
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    // Sending the refresh token to this user's document in the DB!
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    res.status(500).json({
      error:
        "Something went wrong while generating the refresh token and access tokens.",
    });
  }
};

const signin = async (req, res) => {
  // get the email and password first.
  const { email, password } = req.body;

  // Check if any one the fields is missing.
  if (
    [email, password].some(
      (field) =>
        field?.trim() === "" ||
        field?.trim() === null ||
        field?.trim() === undefined
    )
  ) {
    return res.status(400).json({ error: "All fields are required!" });
  }

  // search for the user in the user DB with its unique email.
  const queriedUser = await User.findOne({ email });

  if (!queriedUser) {
    return res.status(404).json({
      error: "User not found, please sign up!",
    });
  }

  // Now if the user is present, check if its password is correct!

  const doesPaswordMatch = await queriedUser.isPasswordCorrect(password);

  if (!doesPaswordMatch) {
    return res.status(401).json({
      error: "Password incorrect!",
    });
  }

  // Now if the password is also correct, then log the user in!
  // Which means, generate access and refresh token for the user!

  const { accessToken, refreshToken } = await generateAccessAndRefereshTokens(
    queriedUser
  );
  // This custom function will save the refresh token in the user's DB. We just need to save the accesstoken in the cookie!
  // Means jo bhi kaam "MongoDB" ka tha, wo ho gya! Means, queried user ke ander toh nahi, but DB ke iss user mei aa gya h refresh token.

  // In order to pass this data of "queriedUser" in response, we need to remove the password.
  const loggedInUser = {};
  const userObj = queriedUser.toObject(); // Converts to plain JS object

  for (const key in userObj) {
    if (key !== "password" && key !== "refreshToken") {
      loggedInUser[key] = userObj[key];
    }
  }

  // Accessing the cookie:-
  const options = {
    httpOnly: true,
    secure: false,
  };

  return res.status(200).cookie("accessToken", accessToken, options).json({
    user: loggedInUser,
    //   accessToken: accessToken,
    //   refreshToken: refreshToken,
    // Not recommended to send the tokens as response, hence removed them!
    message: "User logged in successfully!",
  });
};

const signout = async (req, res) => {
  //   Here, the user's data must be injected in the "req" through the auth.middleware "verifyJWTandPopulateUserDataInReq"
  //   if (!req?.user) {
  //     return
  //   }
  const userId = req.user?._id;
  if (userId) {
    await User.findByIdAndUpdate(
      userId, // injected by "verifyJWTandPopulateUserDataInReq"
      {
        $unset: {
          refreshToken: 1, // this removes the field from document
        },
      },
      {
        new: true,
      }
    );
  }

  const options = {
    httpOnly: true,
    secure: false,
  };

  return res.status(200).clearCookie("accessToken", options).json({
    success: "User logged out successfully!",
  });
};

const sessionCheck = async (req, res) => {
    const userId = req.user?._id;
    if (!userId) {
        return res.status(404).json({
          error: "User not found, please sign in!",
        });
    }
    return res.status(200).json({
        message: "User's session is intact!",
        user: req.user
    })
};

export { registerUser, signin, signout, sessionCheck };
