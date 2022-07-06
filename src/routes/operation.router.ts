import express from "express";
import {
  getAllOperations,
  getByIdOperation,
  putOperation,
  createOperation,
} from "../controllers/operation.controller";

const router = express.Router();

router.post("/api/operation", createOperation);

router.get("/api/operation", getAllOperations);

router.get("/api/operation/:id", getByIdOperation);

router.put("/api/operation/:id", putOperation);

export default router;
