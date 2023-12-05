import express from "express";
import { addItem , getItems, updateItem ,deleteItem } from "../controllers/itemsController";
const router = express.Router();

router.get("/", getItems);
router.post("/addItem", addItem);
router.put("/updateItem/:id", updateItem);
router.delete("/deleteItem/:id", deleteItem);
