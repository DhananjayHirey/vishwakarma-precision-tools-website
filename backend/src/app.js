import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import { errorMiddleware } from "./middlewares/error.middleware.js";
const app = express();

app.use(helmet());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.send("Vishwakarma API is running....");
});

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

import userRoutes from "./routes/user.routes.js";
import productRoutes from "./routes/product.routes.js";
import adminOrderRoutes from "./routes/adminOrder.routes.js";
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", adminOrderRoutes);

app.use(errorMiddleware);

export default app;
