import express from "express";
import {
  addProduct,
  deleteProductByID,
  getAllProduct,
  getProductByID,
  updateProductByID,
} from "../controllers/product.js";

const router = express.Router();

//@api - /api/product/add  - add Product
router.post("/add", addProduct);

//@api - /api/product/get Product
//desc:- details for all the product
router.get("/getProduct", getAllProduct);

//@api - /api/product/:id
//desc:- get product details By ID
router.get("/:id", getProductByID);

//@api - /api/product/:id
//desc;- update product details by ID
router.put("/:id", updateProductByID);

//@api - /api/product/:id
//desc:- delete product by ID
router.delete("/:id", deleteProductByID);

export default router;
