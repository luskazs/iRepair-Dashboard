import { Router } from "express";
import { ServiceOrdersController } from "./service_orders.controller.js";
import { authMiddleware } from "../../middlewares/authMiddleware.js";

const serviceOrdersRoutes = Router();
const serviceOrdersController = new ServiceOrdersController();

serviceOrdersRoutes.use(authMiddleware);

serviceOrdersRoutes.get(
  "/",
  serviceOrdersController.getAll.bind(serviceOrdersController),
);

serviceOrdersRoutes.get(
  "/:id",
  serviceOrdersController.getById.bind(serviceOrdersController),
);

serviceOrdersRoutes.post(
  "/",
  serviceOrdersController.create.bind(serviceOrdersController),
);

serviceOrdersRoutes.put(
  "/:id",
  serviceOrdersController.update.bind(serviceOrdersController),
);

serviceOrdersRoutes.delete(
  "/:id",
  serviceOrdersController.delete.bind(serviceOrdersController),
);

export { serviceOrdersRoutes };