import { Request, Response } from "express";
import mongoose from "mongoose";
import ProductTable from "../database/ProductSchema";
import { EcomProduct } from "../models/EcomProduct";

export const getAllProduct = async (request: Request, response: Response) => {
  try {
    let Product: EcomProduct[] | undefined = await ProductTable.find();
    if (Product) {
      return response.status(200).json(Product);
    }
  } catch (error) {
    return response.status(500).json({
      msg: "Data not found",
    });
  }
};

export const getProduct = async (request: Request, response: Response) => {
  let { productId } = request.params;
  const mongoproductId = new mongoose.Types.ObjectId(productId);
  let theProduct: EcomProduct | undefined | null = await ProductTable.findById(
    mongoproductId
  );
  if (!theProduct) {
    return response.status(500).json({
      data: null,
      error: "No Product is found",
    });
  }
  return response.status(200).json(theProduct);
};

export const createProduct = async (request: Request, response: Response) => {
  let {
    Sub_Category_id,
    Product_name,
    Product_description,
    Product_image,
    Product_Images,
    Product_price,
    Product_brand,
    Product_quantity,
  } = request.body;
  let theProduct: EcomProduct | undefined | null = await new ProductTable({
    Sub_Category_id: Sub_Category_id,
    Product_name: Product_name,
    Product_description: Product_description,
    Product_image: Product_image,
    Product_Images: Product_Images,
    Product_price: Product_price,
    Product_brand: Product_brand,
    Product_quantity: Product_quantity,
  }).save();
  if (theProduct) {
    return response.status(200).json({
      data: theProduct,
      msg: "Product is created",
    });
  }
};

export const updateProduct = async (request: Request, response: Response) => {
  let { productId } = request.params;
  let {
    Sub_Category_id,
    Product_name,
    Product_description,
    Product_image,
    Product_Images,
    Product_price,
    Product_brand,
    Product_quantity,
  } = request.body;
  let theProduct: EcomProduct | undefined | null =
    await ProductTable.findByIdAndUpdate(
      productId,
      {
        Sub_Category_id,
        Product_name,
        Product_description,
        Product_image,
        Product_Images,
        Product_price,
        Product_brand,
        Product_quantity,
      },
      {
        new: true,
      }
    );
  if (!theProduct) {
    return response.status(500).json({
      data: null,
      error: "No Product is found",
    });
  }
  return response.status(200).json(theProduct);
};

export const updateProductStatus = async (
  request: Request,
  response: Response
) => {
  let { productId } = request.params;
  let theProduct: EcomProduct | undefined | null =
    await ProductTable.findByIdAndUpdate(
      productId,
      {
        isActive: false,
      },
      {
        new: true,
      }
    );
  if (!theProduct) {
    return response.status(500).json({
      data: null,
      error: "No Product is found",
    });
  }
  return response.status(200).json(theProduct);
};
