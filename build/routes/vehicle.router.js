"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const vehicle_controller_1 = require("../controllers/vehicle.controller");
const router = express_1.default.Router();
router.post("/api/vehicle", vehicle_controller_1.createVehicle);
router.get("/api/vehicle", vehicle_controller_1.getAllVehicles);
router.get("/api/vehicle/:id", vehicle_controller_1.getByIdVehicle);
router.put("/api/vehicle/:id", vehicle_controller_1.putVehicle);
exports.default = router;
