const express = require('express')
const router = express.Router();

router.get("/", getPromoters);
router.post("/addPromoter", addPromoter);
router.put("/updatePromoter/:id", updatePromoter);
router.delete("/deletePromoter/:id", deletePromoter);
