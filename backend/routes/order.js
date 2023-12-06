import express from "express";
import { addOrder , getOrder , getOrders , deleteOrder} from "../controllers/orderController.js";
import { verifyJWT } from "../middleware/verifyJWT.js";
const router = express.Router();

router.use(verifyJWT)
router.get("/", getOrders);
router.get("/getOrder/:id", getOrder);
router.post("/addOrder", addOrder);
router.delete("/deleteOrder/:id", deleteOrder);

export default router