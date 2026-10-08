import { Router } from "express";
import * as userControllers from "../controllers/user.controller.js";
import * as productControllers from "../controllers/product.controller.js";
import authenticate from "../middlewares/authentication.js";

const routes = Router();

routes.post("/login", userControllers.loginUser);
routes.get("/me", authenticate, userControllers.getCurrentUser);
routes.post("/checkout", authenticate, productControllers.checkout);

export default routes;
