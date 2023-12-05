import express from "express";
import { addItem, deleteItem, getItems, updateItem } from "../controllers/itemsController.js";
import { verifyJWT } from "../middleware/verifyJWT.js";
const router = express.Router();

router.use(verifyJWT)
router.get("/", getItems);
router.post("/addItem", addItem);
router.put("/updateItem/:id", updateItem);
router.delete("/deleteItem/:id", deleteItem);

export default router