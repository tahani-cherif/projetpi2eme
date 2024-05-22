import express from "express";
import mongoose from "mongoose";
import { notFoundError, errorHundler } from "./middlewares/error-handler.js";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import { router as userRoutes } from "./routes/user.js";
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

app.use(notFoundError);
app.use(errorHundler);
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
