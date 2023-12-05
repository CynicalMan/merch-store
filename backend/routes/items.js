import express from "express";
import { addItem, deleteItem, getItems, updateItem } from "../controllers/itemsController.js";
const router = express.Router();

router.get("/", getItems);
router.post("/addItem", addItem);
router.put("/updateItem/:id", updateItem);
router.delete("/deleteItem/:id", deleteItem);

export default router