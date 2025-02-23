import { Request, Response, Router } from "express";
import * as CategoryContoller from "../controller/CategoryController";

const CategoryRouter: Router = Router();


// @usage  : getall category
// @method : get
// @params : no params
// @url    :http://127.0.0.1:9999/category

CategoryRouter.get(
  "/",
  async (request: Request, response: Response) => {
    await CategoryContoller.getAllcategory(request, response);
  }
);


// @usage  : get category by id
// @method : get
// @params : categoryId
// @url    :http://127.0.0.1:9999/category/:categoryId

CategoryRouter.get(
  "/:categoryId",
  async (request: Request, response: Response) => {
    await CategoryContoller.getCategory(request, response);
  }
);


//post
CategoryRouter.post(
  "/",  async (request: Request, response: Response) => {
    console.log("post");
    await CategoryContoller.createCategory(request, response);
  }
);


// update
CategoryRouter.put(
  "/:categoryId",
  async (request: Request, response: Response) => {
    await CategoryContoller.updateCategory(request, response);
  }
);


// delete
CategoryRouter.delete(
  "/:categoryId",
  async (request: Request, response: Response) => {
    await CategoryContoller.deleteCategory(request, response);
  }
);



export default CategoryRouter

