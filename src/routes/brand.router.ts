import express from "express";
import {
  getAllBrands,
  getByIdBrand,
  putBrand,
  createBrand,
} from "../controllers/brand.controller";

const router = express.Router();

router.post("/api/brand", createBrand);

router.get("/api/brand", getAllBrands);

router.get("/api/brand/:id", getByIdBrand);

router.put("/api/brand/:id", putBrand);

export default router;
