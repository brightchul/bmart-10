import { Router } from "express";

import goodsAPI from "./goodsAPI";
import categoryAPI from "./categoryAPI";
import userAPI from "./userAPI";
import recommendAPI from "./recommendAPI";

const router = Router();

router.use("/goods", goodsAPI);
router.use("/category", categoryAPI);
router.use("/user", userAPI);
router.use("/recommend", recommendAPI);

export default router;
