import express from "express";
import authRoutes from "./src/routes/user.routes.js";
import cors from "cors";
import errorHandler from "./src/middlewares/errorHandling.js";
import productRoutes from "./src/routes/product.routes.js";

const app = express();

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

app.use("/api", authRoutes);
app.use("/api/products", productRoutes);

app.use(errorHandler);

export default app;
