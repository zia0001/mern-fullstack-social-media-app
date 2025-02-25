import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import { fileURLToPath } from "url";
import path from "path";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";
import { register, login } from "./controllers/auth.js";
import { verifyToken } from "./middleware/auth.js";
import { createPost } from "./models/post.js";
import pool from "./databasepg.js"; // ✅ PostgreSQL connection

/* CONFIGURATIONS */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(express.static(path.join(__dirname, "public")));

app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

/* FILE STORAGE */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});
const upload = multer({ storage });

/* ROUTES WITH FILES */
app.post("/auth/register", upload.single("picture"), register);
app.post("/post", verifyToken, upload.single("picture"), createPost);
app.post("/auth/login", login);

/* ROUTES */
app.use("/auth/", authRoutes);
app.use("/users", userRoutes);
app.use("/posts", postRoutes);

/* 404 HANDLING */
app.use("*", function (req, res) {
  res.status(404).send("Not found");
});

/* POSTGRESQL CONNECTION & SERVER SETUP */
const PORT = process.env.PORT || 6001;

pool.connect()
  .then(() => {
    app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
  })
  .catch((error) => console.error("❌ Database connection error:", error));
