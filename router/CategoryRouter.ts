import { Request, Response, Router } from "express";
import * as CategoryContoller from "../controller/CategoryController";

const CategoryRouter: Router = Router();


// @usage  : getall category
// @method : get
// @params : no params
// @url    : http://127.0.0.1:8888/category

CategoryRouter.get(
  "/",
  async (request: Request, response: Response) => {
    await CategoryContoller.getAllcategory(request, response);
  }
);


// @usage  : get category by id
// @method : get
// @params : categoryId
// @url    : http://127.0.0.1:8888/category/:categoryId

CategoryRouter.get(
  "/:categoryId",
  async (request: Request, response: Response) => {
    await CategoryContoller.getCategory(request, response);
  }
);

// @usage  : post category 
// @method : post
// @params : noparams
// @url    : http://127.0.0.1:8888/category

//post
CategoryRouter.post(
  "/",  async (request: Request, response: Response) => {
    console.log("post");
    await CategoryContoller.createCategory(request, response);
  }
);

// @usage  : update category by id
// @method : put
// @params : categoryId
// @url    : http://127.0.0.1:8888/subcategory/:categoryId

// update
CategoryRouter.put(
  "/:categoryId",
  async (request: Request, response: Response) => {
    await CategoryContoller.updateCategory(request, response);
  }
);

// @usage  : delete category by id 
// @method : delete
// @params : categoryId
// @url    : http://127.0.0.1:8888/subcategory/delete/:categoryId

// delete
CategoryRouter.put(
  "/delete/:categoryId",
  async (request: Request, response: Response) => {
    await CategoryContoller.updateCategoryStatus(request, response);
  }
);



export default CategoryRouter

