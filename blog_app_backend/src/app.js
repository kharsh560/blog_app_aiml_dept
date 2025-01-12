import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express();

// CORS setup
// app.use(
//   cors({
//     origin: process.env.CORS_ORIGIN,
//     credentials: true,
//   })
// );

const whitelist = ["http://localhost:3000"];

const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like server-to-server requests) or those from the whitelist
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not Allowed by CORS"));
    }
  },
  methods: "GET, HEAD, PUT, PATCH, POST, DELETE",
  credentials: true,
};

// Middlewares -->
app.use(cors(corsOptions));

// For data from URL forms/body, when we accept data, we do some restrictions!
app.use(express.json({limit: "16kb"}));

// 13:39 L9) Some more settings.
// For data from URL:
app.use(express.urlencoded({extended: true, limit: "16kb"}));

// For maybe a public folder or public assets
app.use(express.static("public"));

// To access the user's browser cookies and set them too.
app.use(cookieParser());
// 19:18 L9) Uptil the above line.

// Routing codes:-
// import { router as userRoutes } from "./routes/user.routes.js";
import userRoutes from "./routes/user.routes.js";
import postRoutes from "./routes/post.routes.js"

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/post", postRoutes);

export default app

