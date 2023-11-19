import "dotenv/config";
import express from "express";
import { sequelize } from "./db.js";
import { db } from "./models/models.js";
import cors from "cors";
import router from "./routes/index.js";
import { fileURLToPath } from "url";

import path from "path";
import fileUpload from "express-fileupload";
import { errorHandler } from "./middleware/ErrorHandlingMiddleware.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve(__dirname, "static")));
app.use(fileUpload({}));
app.use("/api", router);

//Обработка ошибок, последний middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    app.listen(PORT, () => {
      console.log(`Server started on PORT ${PORT}`);
    });
  } catch (e) {}
};
start();
