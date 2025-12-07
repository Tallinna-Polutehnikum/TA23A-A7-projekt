import express from "express";
import router from "./src/router.js";
import cors from "cors";
import errorHandler from "./src/middleware/errorHandler.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use(cors());

app.use("/", router);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
