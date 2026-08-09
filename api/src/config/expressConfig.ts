import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { serviceOrdersRoutes } from "../domains/service_orders/service_orders.routes.js";
import { authRoutes } from "../domains/auth/auth.routes.js";
import { clientsRoutes } from "../domains/clients/clients.routes.js";
import { errorMiddleware } from "../middlewares/errorMiddleware.js";

export const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use(express.json());
app.use(cookieParser());

app.use("/auth", authRoutes);
app.use("/clients", clientsRoutes);
app.use("/service-orders", serviceOrdersRoutes);
app.use(errorMiddleware);