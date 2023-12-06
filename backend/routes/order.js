import express from "express";
import { addOrder , getOrder , getOrders , deleteOrder ,updateOrder} from "../controllers/orderController.js";
import { verifyJWT  } from "../middleware/verifyJWT.js";
const router = express.Router();

router.get("/",verifyJWT(["admin"]), getOrders);
router.get("/getOrder/:id",verifyJWT(["user"]), getOrder);
router.post("/addOrder", verifyJWT(["user"]),addOrder);
router.put("/updateOrder/:id", verifyJWT(["admin"]),updateOrder);
router.delete("/deleteOrder/:id",verifyJWT(["user"]) ,deleteOrder);

export default router