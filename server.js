import express from "express";
import dotenv from "dotenv";
import jobRoutes from "./src/routes/jobRoutes.js";
import cors from "cors";

dotenv.config();


const app = express();
app.use(cors());
app.use(express.json());

// main route
app.use("/api/jobs", jobRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
