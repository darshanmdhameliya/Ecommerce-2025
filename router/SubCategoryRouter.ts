import { Request, Response, Router } from "express";
import * as SubCategoryContoller from "../controller/SubCategoryController"

const SubCategoryRouter: Router = Router();


// @usage  : get all Subcategory
// @method : get
// @params : no params
// @url    :http://127.0.0.1:9999/Subcategory

SubCategoryRouter.get(
  "/",
  async (request: Request, response: Response) => {
    await SubCategoryContoller.getAllSubcategory(request, response);
  }
);


// @usage  : get Subcategory by id
// @method : get
// @params : categoryId
// @url    :http://127.0.0.1:9999/Subcategory/:SubcategoryId

SubCategoryRouter.get(
  "/:SubcategoryId",
  async (request: Request, response: Response) => {
    await SubCategoryContoller.getSubCategory(request, response);
  }
);


//post
SubCategoryRouter.post(
  "/",  async (request: Request, response: Response) => {
    console.log("post");
    await SubCategoryContoller.createSubCategory(request, response);
  }
);


// update
SubCategoryRouter.put(
  "/:SubcategoryId",
  async (request: Request, response: Response) => {
    await SubCategoryContoller.updateSubCategory(request, response);
  }
);


// delete
SubCategoryRouter.put(
  "/delete/:SubcategoryId",
  async (request: Request, response: Response) => {
    await SubCategoryContoller.updateSubCategoryStatus(request, response);
  }
);


export default SubCategoryRouter

