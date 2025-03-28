import jwt from "jsonwebtoken"
import { User } from "../models/user.model.js"

const verifyJWTandPopulateUserDataInReq = async (req, res, next) => {
      res.header(
        "Access-Control-Allow-Origin",
        "https://mait-aiml-official-blogspace.netlify.app"
      );
      res.header(
        "Access-Control-Allow-Methods",
        "GET, POST, OPTIONS, PUT, DELETE"
      );
      res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
      );
      res.header("Access-Control-Allow-Credentials", "true");
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");
        if (!token) {
            return res.status(401).json({ error: "Unauthorized request!" });
        }
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const user = await User.findById(decodedToken?._id).select("-password -refreshToken");

        if(!user) {
            return res.status(401).json({ error: "Invalid access token." });
        }

        req.user = user;

        console.log(
            "user injected in req after successful JWT validation through verifyJWT middleware!",
            user._id
        );

        next();
    } catch (error) {
        return res
          .status(401)
          .json({
            error:
              "Problem in verifyJWTandPopulateUserDataInReq block of function!",
          });
    }
}

export default verifyJWTandPopulateUserDataInReq;