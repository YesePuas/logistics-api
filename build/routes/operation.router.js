"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const operation_controller_1 = require("../controllers/operation.controller");
const router = express_1.default.Router();
router.post("/api/operation", operation_controller_1.createOperation);
router.get("/api/operation", operation_controller_1.getAllOperations);
router.get("/api/operation/:id", operation_controller_1.getByIdOperation);
router.put("/api/operation/:id", operation_controller_1.putOperation);
exports.default = router;
