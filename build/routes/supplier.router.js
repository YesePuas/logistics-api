"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const supplier_controller_1 = require("../controllers/supplier.controller");
const router = express_1.default.Router();
router.post("/api/supplier", supplier_controller_1.createSupplier);
router.get("/api/supplier", supplier_controller_1.getAllSuppliers);
router.get("/api/supplier/:id", supplier_controller_1.getByIdSupplier);
router.get("/api/supplier/amountVehicle/:id", supplier_controller_1.getamountVehicleBySupplier);
router.put("/api/supplier/:id", supplier_controller_1.putSupplier);
exports.default = router;
