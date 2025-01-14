import { Router } from "express";
import categoryController from "../controllers/category.controller";
import TokenVerifier from "../utils/auth";

const categoryRouter = Router();

// Endpoint
categoryRouter.post("/category/product", TokenVerifier.verifyRole("ADMIN"), categoryController.createCategory);
categoryRouter.get("/category/product", categoryController.getAllCategories);
categoryRouter.get(
    "/category/product/:id",
    TokenVerifier.verifyRole("ADMIN"),
    categoryController.getCategoryById,
);
categoryRouter.patch(
    "/category/product/:id",
    TokenVerifier.verifyRole("ADMIN"),
    categoryController.updateCategory,
);
categoryRouter.delete(
    "/category/product/:id",
    TokenVerifier.verifyRole("ADMIN"),
    categoryController.deleteCategory,
);

export default categoryRouter;
