"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const driver_controller_1 = require("../controllers/driver.controller");
const router = express_1.default.Router();
router.post("/api/driver", driver_controller_1.createDriver);
router.get("/api/driver", driver_controller_1.getAllDrivers);
router.get("/api/driver/:id", driver_controller_1.getByIdDriver);
router.put("/api/driver/:id", driver_controller_1.putDriver);
exports.default = router;
