import express from "express";
import {
  getAllSuppliers,
  getByIdSupplier,
  putSupplier,
  createSupplier,
  getamountVehicleBySupplier,
} from "../controllers/supplier.controller";

const router = express.Router();

router.post("/api/supplier", createSupplier);

router.get("/api/supplier", getAllSuppliers);

router.get("/api/supplier/:id", getByIdSupplier);

router.get("/api/supplier/amountVehicle/:id", getamountVehicleBySupplier);

router.put("/api/supplier/:id", putSupplier);

export default router;
