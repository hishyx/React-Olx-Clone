import { Router } from "express";
import * as productControllers from "../controllers/product.controller.js";
import authenticate from "../middlewares/authentication.js";

const routes = Router();

routes.get("/", productControllers.getProducts);
routes.get("/:id", authenticate, productControllers.getProduct);
routes.post("/", authenticate, productControllers.createProduct);
routes.put("/:id", authenticate, productControllers.updateProduct);

export default routes;
