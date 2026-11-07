import { Router } from "express";
import { handleGenerateNewShortURL,handleGetAnalytics } from "../controller/url.js";

const router = Router();

router.post("/", handleGenerateNewShortURL);
router.get('/analytics/:shortId',handleGetAnalytics);

export default router;