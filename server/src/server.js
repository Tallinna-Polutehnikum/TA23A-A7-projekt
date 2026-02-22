import express from "express";
import router from "./router/router.js";
import cors from "cors";
import errorHandler from "./middleware/errorHandler.js";

const app = express();
const PORT = process.env.PORT;

app.use(express.json());

app.use(cors());

app.use(express.static("public"));

app.use("/", router);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
