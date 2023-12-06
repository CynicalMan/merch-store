import express from "express";
import { addProduct, deleteProduct, getProducts, updateProduct , getProduct } from "../controllers/productController.js";
import upload from "../middleware/upload.js";
import { verifyJWT } from "../middleware/verifyJWT.js";

const router = express.Router();

router.use(verifyJWT)
router.get("/", getProducts);
router.get("/getProduct/:id", getProduct);
router.post("/addProduct",upload.array("images"), addProduct);
router.put("/updateProduct/:id",upload.array("images"), updateProduct);
router.delete("/deleteProduct/:id", deleteProduct);

export default router