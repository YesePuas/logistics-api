"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const brand_controller_1 = require("../controllers/brand.controller");
const router = express_1.default.Router();
router.post("/api/brand", brand_controller_1.createBrand);
router.get("/api/brand", brand_controller_1.getAllBrands);
router.get("/api/brand/:id", brand_controller_1.getByIdBrand);
router.put("/api/brand/:id", brand_controller_1.putBrand);
exports.default = router;
