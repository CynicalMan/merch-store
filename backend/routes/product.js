import express from "express";
import { addProduct, deleteProduct, getProducts, updateProduct } from "../controllers/productController.js";
import upload from "../middleware/upload.js";
import { verifyJWT } from "../middleware/verifyJWT.js";

const router = express.Router();

router.use(verifyJWT)
router.get("/", getProducts);
router.post("/addProduct",upload.array("images"), addProduct);
router.put("/updateProduct/:id", updateProduct);
router.delete("/deleteProduct/:id", deleteProduct);

export default router