import express from "express";
import mongoose from "mongoose";
import { notFoundError, errorHundler } from "./middlewares/error-handler.js";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import { router as userRoutes } from "./routes/user.js";
import { router as authRoutes } from "./routes/auth.js";
import { router as eventRoutes } from "./routes/event.js";
import { router as typeventRoutes } from "./routes/typeevent.js";
import { router as reservationtRoutes } from "./routes/reservation.js";
import reclamationRoutes from "./routes/reclamation.js";
dotenv.config({ path: ".env" });
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

app.use(cors());
app.use(morgan(process.env.NODE_ENV));
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/reclamation", reclamationRoutes);
app.use("/api/event", eventRoutes);
app.use('/api/typeEvent', typeventRoutes);
app.use('/api/event', eventRoutes);
app.use("/api/reservation", reservationtRoutes);



app.use(notFoundError);
app.use(errorHundler);
app.listen(port, '0.0.0.0', () => console.log(`Server is running on port ${port}`));


