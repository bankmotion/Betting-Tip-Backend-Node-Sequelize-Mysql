import { Router } from "express";
import { getCountriesController } from "../controllers/countries.controller";

const router = Router();

router.get("/", getCountriesController);

export default router;
