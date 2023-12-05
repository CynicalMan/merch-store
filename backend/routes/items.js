import express from "express"
import { addPromoter, deletePromoter, getPromoters, updatePromoter } from "../controllers/itemsController";
const router = express.Router();

router.get("/", getPromoters);
router.post("/addPromoter", addPromoter);
router.put("/updatePromoter/:id", updatePromoter);
router.delete("/deletePromoter/:id", deletePromoter);
