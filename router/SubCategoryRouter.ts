import { Request, Response, Router } from "express";
import * as SubCategoryContoller from "../controller/SubCategoryController"

const SubCategoryRouter: Router = Router();


// @usage  : get all Subcategory
// @method : get
// @params : no params
// @url    :http://127.0.0.1:8888/subcategory

SubCategoryRouter.get(
  "/",
  async (request: Request, response: Response) => {
    await SubCategoryContoller.getAllSubcategory(request, response);
  }
);

// @usage  : get Subcategory by id
// @method : get
// @params : categoryId
// @url    :http://127.0.0.1:8888/subcategory/:subcategoryId

SubCategoryRouter.get(
  "/:subcategoryId",
  async (request: Request, response: Response) => {
    await SubCategoryContoller.getSubCategory(request, response);
  }
);

// @usage  : post subcategory
// @method : post
// @params : noparams
// @url    : http://127.0.0.1:8888/subcategory

//post
SubCategoryRouter.post(
  "/",  async (request: Request, response: Response) => {
    console.log("post");
    await SubCategoryContoller.createSubCategory(request, response);
  }
);

// @usage  : update subcategory by id
// @method : put
// @params : subcategoryId
// @url    : http://127.0.0.1:8888/product/:subcategoryId

// update
SubCategoryRouter.put(
  "/:subcategoryId",
  async (request: Request, response: Response) => {
    await SubCategoryContoller.updateSubCategory(request, response);
  }
);

// @usage  : delete subcategory by id
// @method : delete
// @params : subcategoryId
// @url    : http://127.0.0.1:8888/subcategory/delete/:subcategoryId

// delete
SubCategoryRouter.put(
  "/delete/:subcategoryId",
  async (request: Request, response: Response) => {
    await SubCategoryContoller.updateSubCategoryStatus(request, response);
  }
);


export default SubCategoryRouter

