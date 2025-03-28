import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

// CORS setup
// 1)
// app.use(
//   cors({
//     origin: process.env.CORS_ORIGIN,
//     credentials: true,
//   })
// );

// 2)
// const whitelist = ["https://mait-aiml-official-blogspace.netlify.app"];

// const corsOptions = {
//   origin: function (origin, callback) {
//     // Allow requests with no origin (like server-to-server requests) or those from the whitelist
//     if (!origin || whitelist.indexOf(origin) !== -1) {
//       callback(null, true);
//     } else {
//       callback(new Error("Not Allowed by CORS"));
//     }
//   },
//   methods: "GET, HEAD, PUT, PATCH, POST, DELETE",
//   credentials: true,
// };

// // Middlewares -->
// app.use(cors(corsOptions));

// 3)
const corsOptions = {
  origin: "https://mait-aiml-official-blogspace.netlify.app",
  methods: "GET, HEAD, PUT, PATCH, POST, DELETE",
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"],
};
app.use(cors(corsOptions));
// 4)
// app.use(
//   cors({
//     origin: "https://mait-aiml-official-blogspace.netlify.app",
//   })
// );
// NOTE: Removed CORS from express app since nginx is already handling it!

// For data from URL forms/body, when we accept data, we do some restrictions!
app.use(express.json({ limit: "16kb" }));

// 13:39 L9) Some more settings.
// For data from URL:
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

// For maybe a public folder or public assets
app.use(express.static("public"));

// To access the user's browser cookies and set them too.
app.use(cookieParser());
// 19:18 L9) Uptil the above line.
app.options("*", cors(corsOptions));

// Routing codes:-
// import { router as userRoutes } from "./routes/user.routes.js";
// Exported them through "default"
import userRoutes from "./routes/user.routes.js";
import postRoutes from "./routes/post.routes.js"
import appreciationRoutes from "./routes/appreciation.routes.js";
import commentRoutes from "./routes/comment.routes.js";

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/post", postRoutes);
app.use("/api/v1/appreciation", appreciationRoutes);
app.use("/api/v1/comment", commentRoutes);

export default app;
