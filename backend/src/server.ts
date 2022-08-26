import express from "express";
import connectDB from "./utils/connectDB";
import router from "./routes";

const app = express();

const port: number | string = 8000;
app.use(express.json());
app.use(router);

app.listen(port, () => {
  console.log("server is running");
  connectDB();
});
