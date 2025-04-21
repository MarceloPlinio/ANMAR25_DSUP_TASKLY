import express from "express";
import cors from "cors";
import taskRoutes from "./routes/taskRoutes";
import noteRoutes from "./routes/noteRoutes";
import errorHandler from "./middlewares/errorHandler";

const app = express();

app.use(cors());

app.use(express.json());

app.use("/", taskRoutes);
app.use("/", noteRoutes);

app.use(errorHandler);

app.listen(3000, () => {
  console.log("Server Listening in http://localhost:3000");
});
