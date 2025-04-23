import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";

import { eventBettingTip } from "./module/tip.create.module";
import routes from "./routes";
const app = express();

// Middlewares
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/", routes);

eventBettingTip();
// getBets()

export default app;
