"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.putVehicle = exports.getByIdVehicle = exports.getAllVehicles = exports.createVehicle = void 0;
const database_1 = require("../database");
const createVehicle = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { license_plate, model, sub_brand, id_brand } = req.body;
    try {
        const result = yield database_1.AppDataSourse.query("INSERT INTO vehicle (license_plate, model, sub_brand, id_brand) VALUES ($1, $2, $3, $4) RETURNING *", [license_plate, model, sub_brand, id_brand]);
        res.json(result);
    }
    catch (error) {
        console.log("error.message", error.message);
        res.status(400).send(error.message);
    }
});
exports.createVehicle = createVehicle;
const getAllVehicles = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allVehicles = yield database_1.AppDataSourse.query("SELECT * FROM vehicle");
        res.json(allVehicles);
    }
    catch (error) {
        console.error(error);
    }
});
exports.getAllVehicles = getAllVehicles;
const getByIdVehicle = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const result = yield database_1.AppDataSourse.query("SELECT * FROM vehicle WHERE id = $1", [id]);
        if (result.length === 0) {
            return res.status(404).json({
                message: "Vehicle not found",
            });
        }
        return res.json(result);
    }
    catch (error) {
        console.log(error);
        return;
    }
});
exports.getByIdVehicle = getByIdVehicle;
const putVehicle = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { license_plate, model, sub_brand, id_brand, active } = req.body;
        const update_ad = new Date();
        const result = yield database_1.AppDataSourse.query("UPDATE vehicle SET license_plate = $1, model = $2, sub_brand = $3, id_brand = $4, active = $5,  update_ad = $6 WHERE id = $7 RETURNING *", [license_plate, model, sub_brand, id_brand, active, update_ad, id]);
        console.log(result[0].length);
        if (result[0].length === 0) {
            return res.status(404).json({
                message: "Vehicle not found",
            });
        }
        return res.json(result[0]);
    }
    catch (error) {
        return;
    }
});
exports.putVehicle = putVehicle;
