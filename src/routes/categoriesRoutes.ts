import express from "express";
const router = express.Router();

import {createCategory, getCategories, getCategory, updateCategory, deleteCategory} from "../controllers/categoriesController";


router.route("/categories").post(createCategory).get(getCategories);
router
  .route("/categories/:id")
  .get(getCategory)
  .put(updateCategory)
  .delete(deleteCategory);

export default router;