import express from "express";
import { addProduct, deleteProduct, getProducts, updateProduct , getProduct } from "../controllers/productController.js";
import upload from "../middleware/upload.js";
import { verifyJWT } from "../middleware/verifyJWT.js";

const router = express.Router();

router.get("/", getProducts);
router.get("/getProduct/:id", getProduct);
router.post("/addProduct", verifyJWT(["admin"]),upload.array("images"), addProduct);
router.put("/updateProduct/:id", verifyJWT(["admin"]),upload.array("images"), updateProduct);
router.delete("/deleteProduct/:id", verifyJWT(["admin"]), deleteProduct);

export default router