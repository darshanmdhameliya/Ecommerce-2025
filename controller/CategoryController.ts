import { Request, Response } from "express";
import CategoryTable from "../database/CategorySchema";
import { EcomCategory } from "../models/EcomCategory";
import mongoose from "mongoose";

// @usage : to get all category
// @method : GET
// @params : no-params
export const getAllcategory = async (request: Request, response: Response) => {
  try {
    let Category: EcomCategory[] | undefined = await CategoryTable.find();
    if (Category) {
      return response.status(200).json(Category);
    }
  } catch (err: any) {
    return response.status(500).json({
      msg: "Data not Found",
    });
  }
};

// get Category by id
export const getCategory = async (request: Request, response: Response) => {
  let { categoryId } = request.params;
  const mongocategoryId = new mongoose.Types.ObjectId(categoryId);
  let theCategory: EcomCategory | undefined | null =
    await CategoryTable.findById(mongocategoryId);
  if (!theCategory) {
    return response.status(500).json({
      data: null,
      error: "No Category is found",
    });
  }
  return response.status(200).json(theCategory);
};

//post
export const createCategory = async (request: Request, response: Response) => {
  let { category_name, category_description, category_logo, isActive } =
    request.body;
  let theCategory: EcomCategory | null | undefined = await new CategoryTable({
    category_name: category_name,
    category_description: category_description,
    category_logo: category_logo,
    isActive: isActive,
  }).save();
  if (theCategory) {
    return response.status(200).json({
      data: theCategory,
      msg: "Category is created",
    });
  }
};

//update
export const updateCategory = async (request: Request, response: Response) => {
  let { categoryId } = request.params;
  let { category_name, category_description, category_logo, isActive } =
    request.body;
  let theCategory: EcomCategory | undefined | null =
    await CategoryTable.findByIdAndUpdate(
      categoryId,
      {
        category_name,
        category_description,
        category_logo,
        isActive: isActive,
      },
      {
        new: true,
      }
    );
  if (!theCategory) {
    return response.status(500).json({
      data: null,
      error: "No Category is found",
    });
  }
  return response.status(200).json(theCategory);
};


//Delete
export const deleteCategory = async (request: Request, response: Response) => {
  let { categoryId } = request.params;
  let theCategory: EcomCategory | undefined | null =
    await CategoryTable.findByIdAndDelete(categoryId);
  if (!theCategory) {
    return response.status(500).json({
      data: null,
      error: "No Category is found",
    });
  }
  return response.status(200).json(theCategory);
};


