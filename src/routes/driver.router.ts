import express from "express";
import {
  getAllDrivers,
  getByIdDriver,
  putDriver,
  createDriver,
} from "../controllers/driver.controller";

const router = express.Router();

router.post("/api/driver", createDriver);

router.get("/api/driver", getAllDrivers);

router.get("/api/driver/:id", getByIdDriver);

router.put("/api/driver/:id", putDriver);

export default router;
