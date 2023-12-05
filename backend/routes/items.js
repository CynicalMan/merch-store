import express from "express";
import { addItem, deleteItem, getItems, updateItem } from "../controllers/itemsController.js";
import upload from "../middleware/upload.js";
const router = express.Router();

router.get("/", getItems);
router.post("/addItem",upload.array("images"), addItem);
router.put("/updateItem/:id", updateItem);
router.delete("/deleteItem/:id", deleteItem);

export default router