import express from "express";
import mongoose from "mongoose";
import { notFoundError, errorHundler } from "./middlewares/error-handler.js";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import cloudinary from "cloudinary";
import destinationRoutes from "./routes/destination.js";
import loisirRoutes from "./routes/loisir.js";
import loisirCategoryRoutes from "./routes/loisircategory.js";
import path from 'path';

import { router as userRoutes } from "./routes/user.js";
import { router as offreRoutes } from "./routes/offre.js";
import { router as categorieRoutes } from "./routes/category-offre.js";
import { fileURLToPath } from 'url';

import reclamationRoutes from "./routes/reclamation.js";
import reponseRoutes from "./routes/reponse.js";
import typeRoutes from "./routes/type.js";
import circuitRoutes from "./routes/circuitRoutes.js";
import typeTransportRoutes from "./routes/typeTransportRoutes.js";
import stationRoutes from "./routes/stationRoutes.js";

// import mailRoutes from './routes/mail.js';
import { router as authRoutes } from "./routes/auth.js";

dotenv.config({ path: ".env" });

process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

const app = express();

const port = process.env.PORT;
const databaseName = "bdpi";

mongoose
  .connect(`${process.env.DB_URL}/${databaseName}`)
  .then(() => {
    console.log(`Connected to ${databaseName}`);
  })
  .catch((err) => {
    console.log(err);
  });

  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  
  // Serve static files from the "uploads" directory
app.use("/uploads", express.static(path.join(__dirname, "uploads")))
app.use(cors());
app.use(morgan(process.env.NODE_ENV));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/destinations", destinationRoutes);
app.use("/api/loisirs", loisirRoutes);
app.use("/api/loisirCategories", loisirCategoryRoutes);
app.use("/api/circuits", circuitRoutes);
app.use("/api/typeTransports", typeTransportRoutes);
app.use("/api/stations", stationRoutes);

app.use("/api/users", userRoutes);
app.use("/offre", offreRoutes);
app.use("/categorie", categorieRoutes);
app.use("/api/reclamation", reclamationRoutes);
app.use("/api/reponse", reponseRoutes);
app.use("/api/type", typeRoutes);
// app.use('/api/mail', mailRoutes);
app.use("/api/auth", authRoutes);
app.use("/reclamation", reclamationRoutes);

app.use(notFoundError);
app.use(errorHundler);
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
