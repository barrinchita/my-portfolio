import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const ACCESS_TOKEN_SECRET_KEY = process.env.ACCESS_TOKEN_SECRET_KEY;
const REFRESH_TOKEN_SECRET_KEY = process.env.REFRESH_TOKEN_SECRET_KEY;

import bcrypt from "bcrypt";
import { RefreshTokens, User } from "../../schemas/userSchema.js";

export const login = async (req, res) => {
  try {
    let password = req.body.password;
    let email = req.body.email;

    const user = await User.findOne(
      { email: email },
      { name: 1, password: 1, _id: 1 }
    );

    if (user) {
      let mainPassword = user.password;
      const isValid = await bcrypt.compare(password, mainPassword);
      if (isValid) {
        const accessToken = jwt.sign(
          { username: user.name, userId: user._id },
          ACCESS_TOKEN_SECRET_KEY,
          { expiresIn: "30m" }
        );

        const refreshToken = jwt.sign(
          { username: user.name, userId: user._id },
          REFRESH_TOKEN_SECRET_KEY,
          { expiresIn: "1d" }
        );

        const newRefreshToken = new RefreshTokens({
          userId: user._id,
          username: user.name,
          token: refreshToken,
        });

        newRefreshToken
          .save()
          .then(() => {
            res
              .status(201)
              .json({
                success: true,
                message: "User verified",
                accessToken: accessToken,
                refreshToken: refreshToken,
              });
          })
          .catch((err) => console.log("Error occured", err));
      } else {
        console.log("Password incorrect");
        res.status(400).json({ success: false, message: "Password incorrect" });
      }
    } else {
      console.log("User doesn't exist");
      res.status(400).json({ success: false, message: "User doesn't exist" });
    }
  } catch (error) {
    console.log("An error occured: ", error);
    res.status(500).json({ success: false, message: "Internal error." });
  }
};
