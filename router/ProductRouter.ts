import { Request , Response, Router } from "express";
import * as ProductContoller from "../controller/ProductContoller"

const ProductRouter:Router = Router();


// @usage  : get all Product
// @method : get
// @params : no params
// @url    :http://127.0.0.1:9999/product

ProductRouter.get("/",async ( request:Request , response:Response)=>{
    await ProductContoller.getAllProduct(request,response)
})



// @usage  : get all Product by Id
// @method : get
// @params : ProductId
// @url    :http://127.0.0.1:9999/product/:productId

ProductRouter.get("/:productId",async ( request:Request , response:Response)=>{
    await ProductContoller.getProduct(request,response)
})


//post 
ProductRouter.post("/",async ( request:Request , response:Response)=>{
    await ProductContoller.createProduct(request,response)
})

//update
ProductRouter.put("/:productId",async ( request:Request , response:Response)=>{
    await ProductContoller.updateProduct(request,response)
})

//delete
ProductRouter.put("/delete/:productId",async ( request:Request , response:Response)=>{
    await ProductContoller.updateProductStatus(request,response)
})

export default ProductRouter