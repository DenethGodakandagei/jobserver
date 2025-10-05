import express from "express";
import { getJobs } from "../controllers/jobController.js";

const router = express.Router();

// /api/jobs
router.get("/", getJobs);

export default router;
