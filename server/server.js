import express from "express";
import router from "./src/router.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use("/", router);

app.get("/", (req, res) => {
  res.send("Works");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
