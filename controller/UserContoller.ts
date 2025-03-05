import { Request, Response } from "express";
import mongoose from "mongoose";
import UserTable from "../database/UserSchema";
import { EcomUser } from "../models/EcomUser";
import jwt from "jsonwebtoken"
import bcryptjs from "bcryptjs";
import gravatar from "gravatar"
import { validationResult } from "express-validator";

export const getAllUser = async (request: Request, response: Response) => {
  try {
    let user: EcomUser[] | undefined = await UserTable.find();
    if (user) {
      return response.status(200).json(user);
    }
  } catch (err: any) {
    return response.status(500).json({
      msg: "Data not found",
    });
  }
};

export const getUser = async (request: Request, response: Response) => {
  let { userId } = request.params;
  const mongouserId = new mongoose.Types.ObjectId(userId);
  let theuser: EcomUser | undefined | null = await UserTable.findById(mongouserId);
  if (!theuser) {
    return response.status(500).json({
      data: null,
      error: "No user is found",
    });
  }
  return response.status(200).json(theuser);
};

export const registerUser = async (request: Request, response: Response) => {
  const errors = validationResult(request);

  if (!errors.isEmpty()) {
    return response.status(400).json({ errors: errors.array() });
  }
  try {
    //read the form data
    let { username, email, password } = request.body;

    // check if the user is exists
    const userObj = await UserTable.findOne({ email: email });
    if (userObj) {
      return response.status(400).json({
        error: "The user is already exists",
      });
    }

    //password encryption
    const salt = await bcryptjs.genSalt(10);
    const hashPassword = await bcryptjs.hash(password, salt);

    //gravatar url
    const imageUrl = gravatar.url(email, {
      size: "200",
      rating: "pg",
      default: "mm",
    });

    //insert to db
    const newUser: EcomUser = {
      username: username,
      email: email,
      password: hashPassword,
      imageUrl: imageUrl,
      isAdmin: false,
    };

    const theUserObj = await new UserTable(newUser).save();
    if (theUserObj) {
      return response.status(200).json({
        msg: "Registration is success!",
      });
    }
  } catch (error: any) {
    return response.status(500).json({
      error: error.message,
    });
  }
};

export const loginUser = async (request: Request, response: Response) => {
  const errors = validationResult(request);

  if (!errors.isEmpty()) {
    return response.status(400).json({ errors: errors.array() });
  }
  try {
    //read the form data
    let { email, password } = request.body;

    // check for email
    const userObj: EcomUser | undefined | null = await UserTable.findOne({
      email: email,
    });
    if (!userObj) {
      return response.status(400).json({
        error: "the user is already exists",
      });
    }


    // check for password
    let isMatch: boolean = await bcryptjs.compare(password, userObj.password);
    if (!isMatch) {
      return response.status(500).json({
        error: "Invaid password!",
      });
    }

    //create token

    const secretKey: string | undefined = process.env.JWT_SECRET_KEY;
    
    const payload: any = {
      user: {
        id: userObj._id,
        email: userObj.email,
      },
    };

    if (secretKey && payload) {
      jwt.sign(
        payload,
        secretKey,
        {
          expiresIn: 100000000000,
        },
        (error, encoded) => {
          if (error) throw error;
          if (encoded) {
            return response.status(200).json({
              data:userObj,
              token: encoded,
              msg: "Login is Success!",
            });
          }
        }
      );
    }

  } catch (error: any) {
    return response.status(500).json({
      error: error.message,
    });
  }

};

export const updateuser = async (request: Request, response: Response) => {
  let { userId } = request.params;
  let { username, email, password, imageUrl, isAdmin } = request.body;
  let theuser: EcomUser | undefined | null = await UserTable.findByIdAndUpdate(
    userId,
    {
      username,
      email,
      password,
      imageUrl,
      isAdmin,
    },
    {
      new: true,
    }
  );
  if (!theuser) {
    return response.status(500).json({
      data: null,
      msg: "No user is found",
    });
  }
  return response.status(200).json(theuser);
};

export const deleteuser = async (request: Request, response: Response) => {
  let { userId } = request.params;
  let theuser: EcomUser | undefined | null = await UserTable.findByIdAndDelete(
    userId
  );
  if (!theuser) {
    return response.status(500).json({
      data: null,
      msg: "No user is found",
    });
  }
  return response.status(200).json(theuser);
};
