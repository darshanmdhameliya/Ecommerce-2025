import { Request, Response, Router } from "express";
import { body } from "express-validator";
import * as UserContoller from "../controller/UserContoller"

const UserRouter: Router = Router();

// @usage  : get all user
// @method : get
// @params : no params
// @url    :http://127.0.0.1:8888/user

UserRouter.get("/", async (request: Request, response: Response) => {
  await UserContoller.getAllUser(request, response);
});

// @usage  : get user by id
// @method : get
// @params : userId
// @url    :http://127.0.0.1:8888/user/:userId

UserRouter.get("/:userId", async (request: Request, response: Response) => {
  await UserContoller.getUser(request, response);
});


// @usage  : register user
// @method : POST
// @params : username , email , password
// @url    :http://127.0.0.1:8888/user/register

//register
UserRouter.post(
  "/register",
  [
    body("username").not().isEmpty().withMessage("UserName is Required"),
    body("email").not().isEmpty().withMessage("email is Required"),
    body("password").isStrongPassword().withMessage("Strong password is Required"),
  ],
  async (request: Request, response: Response) => {
    await UserContoller.registerUser(request, response);
  }
);

// @usage  : login user
// @method : POST
// @params : email , password
// @url    :http://127.0.0.1:8888/user/login

//login
UserRouter.post(
  "/login",
  [
    body("email").not().isEmpty().withMessage("email is Required"),
    body("password").isStrongPassword().withMessage("Strong password is Required"),
  ],
  async (request: Request, response: Response) => {
    await UserContoller.loginUser(request, response);
  }
);

// @usage  : update user by id
// @method : put
// @params : userId
// @url    : http://127.0.0.1:8888/product/:userId

//update
UserRouter.put("/:userId", async (request: Request, response: Response) => {
  await UserContoller.updateuser(request, response);
});

// @usage  : delete user by id
// @method : delete
// @params : userId
// @url    : http://127.0.0.1:8888/subcategory/delete/:userId

//delete
UserRouter.delete("/:userId", async (request: Request, response: Response) => {
  await UserContoller.deleteuser(request, response);
});

export default UserRouter;
