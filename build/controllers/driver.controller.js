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
exports.putDriver = exports.getByIdDriver = exports.getAllDrivers = exports.createDriver = void 0;
const database_1 = require("../database");
const createDriver = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { document_type, document_number, full_name } = req.body;
    try {
        const result = yield database_1.AppDataSourse.query("INSERT INTO driver (document_type, document_number, full_name) VALUES ($1, $2, $3) RETURNING *", [document_type, document_number, full_name]);
        res.json(result);
    }
    catch (error) {
        console.log("error.message", error.message);
        res.status(400).send(error.message);
    }
});
exports.createDriver = createDriver;
const getAllDrivers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allDrivers = yield database_1.AppDataSourse.query("SELECT * FROM driver");
        res.json(allDrivers);
    }
    catch (error) {
        console.error(error);
    }
});
exports.getAllDrivers = getAllDrivers;
const getByIdDriver = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const result = yield database_1.AppDataSourse.query("SELECT * FROM driver WHERE id = $1", [id]);
        if (result.length === 0) {
            return res.status(404).json({
                message: "Driver not found",
            });
        }
        return res.json(result);
    }
    catch (error) {
        console.log(error);
        return;
    }
});
exports.getByIdDriver = getByIdDriver;
const putDriver = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { document_type, document_number, full_name, active } = req.body;
        const update_ad = new Date();
        const result = yield database_1.AppDataSourse.query("UPDATE driver SET document_type = $1, document_number = $2, full_name = $3, active = $4, update_ad = $5 WHERE id = $6 RETURNING *", [document_type, document_number, full_name, active, update_ad, id]);
        console.log(result[0].length);
        if (result[0].length === 0) {
            return res.status(404).json({
                message: "Driver not found",
            });
        }
        return res.json(result[0]);
    }
    catch (error) {
        return;
    }
});
exports.putDriver = putDriver;
