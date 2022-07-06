import express from "express";
import {
  getAllVehicles,
  getByIdVehicle,
  putVehicle,
  createVehicle,
} from "../controllers/vehicle.controller";

const router = express.Router();

router.post("/api/vehicle", createVehicle);

router.get("/api/vehicle", getAllVehicles);

router.get("/api/vehicle/:id", getByIdVehicle);

router.put("/api/vehicle/:id", putVehicle);

export default router;
