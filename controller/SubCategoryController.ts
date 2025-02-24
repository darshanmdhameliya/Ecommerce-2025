import { Request, Response } from "express";
import SubCategoryTable from "../database/SubCategorySchema";
import { EcomSubCategory } from "../models/EcomSubCategory";
import mongoose from "mongoose";

// @usage : to get all category
// @method : GET
// @params : no-params
export const getAllSubcategory = async (request: Request, response: Response) => {
  try {
    let SubCategory: EcomSubCategory[] | undefined = await SubCategoryTable.find();
    if (SubCategory) {
      return response.status(200).json(SubCategory);
    }
  } catch (err: any) {
    return response.status(500).json({
      msg: "Data not Found",
    });
  }
};

// get SubCategory by id
export const getSubCategory = async (request: Request, response: Response) => {
  let { SubcategoryId } = request.params;
  const mongosubcategoryId = new mongoose.Types.ObjectId( SubcategoryId);
  let theSubCategory: EcomSubCategory | undefined | null =
    await SubCategoryTable.findById(mongosubcategoryId);
  if (!theSubCategory) {
    return response.status(500).json({
      data: null,
      error: "No SubCategory is found",
    });
  }
  return response.status(200).json(theSubCategory);
};


//post
export const createSubCategory = async (request: Request, response: Response) => {
  let { category_id,sub_category_name, sub_category_description ,sub_category_logo , isActive } =
    request.body;
  let theSubCategory: EcomSubCategory | null | undefined = await new SubCategoryTable({
    category_id:category_id,
    sub_category_name:sub_category_name,
    sub_category_description:sub_category_description,
    sub_category_logo:sub_category_logo,
    isActive:isActive
  }).save();
  if (theSubCategory) {
    return response.status(200).json({
      data: theSubCategory,
      msg: "SubCategory is created",
    });
  }
};

//update
export const updateSubCategory = async (request: Request, response: Response) => {
  let { SubcategoryId } = request.params;
  let { category_id,sub_category_name, sub_category_description ,sub_category_logo , isActive} =
    request.body;
  let theSubCategory: EcomSubCategory | undefined | null =
    await SubCategoryTable.findByIdAndUpdate(
      SubcategoryId,
      {
        category_id,
        sub_category_name,
        sub_category_description,
        sub_category_logo,
        isActive
      },
      {
        new: true,
      }
    );
  if (!theSubCategory) {
    return response.status(500).json({
      data: null,
      error: "No SubCategory is found",
    });
  }
  return response.status(200).json(theSubCategory);
};


//Delete
export const updateSubCategoryStatus = async (request: Request, response: Response) => {
  let { SubcategoryId } = request.params;
  let theSubCategory: EcomSubCategory | undefined | null =
    await SubCategoryTable.findByIdAndUpdate(
      SubcategoryId,
      {
        isActive:false
      },
      {
        new:true,
      }
    );
  if (!theSubCategory) {
    return response.status(500).json({
      data: null,
      error: "No SubCategory is found",
    });
  }
  return response.status(200).json(theSubCategory);
};


