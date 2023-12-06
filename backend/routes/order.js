import express from "express";
import { addOrder , getOrder , getOrders , deleteOrder ,updateOrder} from "../controllers/orderController.js";
import { verifyJWT } from "../middleware/verifyJWT.js";
const router = express.Router();

router.use(verifyJWT)
router.get("/", getOrders);
router.get("/getOrder/:id", getOrder);
router.post("/addOrder", addOrder);
router.put("/updateOrder/:id", updateOrder);
router.delete("/deleteOrder/:id", deleteOrder);

export default router