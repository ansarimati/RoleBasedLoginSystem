import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import { register } from "./controllers/auth.js";
import authRoutes from "./routes/auth.js";

// SEEVER SETUP

const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());

//API

app.post("/auth/register", register);
app.use("/auth", authRoutes);

// MONGOOSE SETUP

const PORT = process.env.PORT || 6001;
mongoose.connect(process.env.MONGO_URL).then(() => {
    app.listen(PORT, () => console.log("server connected @PORT", PORT))
}).catch((err) => console.log(err, "server did not connected"))


