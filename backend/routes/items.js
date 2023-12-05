const express = require('express');
const { addItem , getItems, updateItem ,deleteItem } = require('../controllers/itemsController');
const router = express.Router();

router.get("/", getItems);
router.post("/addItem", addItem);
router.put("/updateItem/:id", updateItem);
router.delete("/deleteItem/:id", deleteItem);
