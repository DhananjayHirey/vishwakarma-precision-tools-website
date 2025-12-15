import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import { errorMiddleware } from "./middlewares/error.middleware.js";
const app = express();
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://vishwakarma-precision-tools-website-phi.vercel.app/",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(helmet());

app.get("/", (req, res) => {
  res.send("Vishwakarma API is running....");
});

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

import userRoutes from "./routes/user.routes.js";
import productRoutes from "./routes/product.routes.js";
import adminOrderRoutes from "./routes/order.routes.js";
import paymentsRoutes from "./routes/payments.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import cartRoutes from "./routes/cart.routes.js";
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", adminOrderRoutes);
app.use("/api/payments", paymentsRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/cart", cartRoutes);
app.use(errorMiddleware);

export default app;
