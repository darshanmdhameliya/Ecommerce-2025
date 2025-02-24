import express, { Application, Request, Response } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config({path:"./.env"});

const hostName: string = "127.0.0.1";
const port: string | number | undefined = process.env.PORT || 8888;
const dbUrl: any = process.env.MONGO_DB_CLOUD_URL;
const dbName: string | undefined = process.env.MONGO_DB_DATABASE;
const app: Application = express();

app.get("/", (request: Request, response: Response) => {
  response.status(200).json({
    msg: "welcome to express server",
  });
});

// configure the routers
import Category from "./router/CategoryRouter";

/** 
@usage : to get all category
@methodm: GETs
@params : no-params
@url : http://localhost:9999/category
*/

app.use(express.json());
app.use("/category", Category);


// configure the routers
import SubCategoryRouter from "./router/SubCategoryRouter";


/** 
@usage : to get all subcategory
@methodm: GETs
@params : no-params
@url : http://localhost:9999/Subcategory
*/

app.use(express.json());
app.use("/subcategory",SubCategoryRouter );


// configure the routers
import ProductRouter from "./router/ProductRouter";

/** 
@usage : to get all Product
@methodm: GETs
@params : no-params
@url : http://localhost:9999/Product
*/

app.use(express.json());
app.use("/product",ProductRouter );

if (port) {
  app.listen(Number(port), () => {
    if (dbUrl && dbName) {
      mongoose
        .connect(dbUrl, { dbName: dbName })
        .then(() => {
          console.log("Connection Established...");
        })
        .catch((error) => {
          console.log(error);
          process.exit(0); // force stop express server
        });
    }
    console.log(`Expresss server started http://${hostName}:${port}`);
  });
}
