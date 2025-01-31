import { Router } from "express";

import goodsAPI from "./goodsAPI";
import categoryAPI from "./categoryAPI";
import userAPI from "./userAPI";
import recommendAPI from "./recommendAPI";
import cartAPI from "./cartAPI";

const router = Router();

router.use("/goods", goodsAPI);
router.use("/category", categoryAPI);
router.use("/user", userAPI);
router.use("/recommend", recommendAPI);
router.use("/cart", cartAPI);

export default router;
