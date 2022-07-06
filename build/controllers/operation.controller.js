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
exports.putOperation = exports.getByIdOperation = exports.getAllOperations = exports.createOperation = void 0;
const database_1 = require("../database");
const createOperation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_vehicle, id_supplier, id_driver } = req.body;
    try {
        const result = yield database_1.AppDataSourse.query("INSERT INTO operation (id_vehicle, id_supplier, id_driver) VALUES ($1, $2, $3) RETURNING *", [id_vehicle, id_supplier, id_driver]);
        res.json(result);
    }
    catch (error) {
        console.log("error.message", error.message);
        res.status(400).send(error.message);
    }
});
exports.createOperation = createOperation;
const getAllOperations = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allOperation = yield database_1.AppDataSourse.query("SELECT * FROM operation");
        res.json(allOperation);
    }
    catch (error) {
        console.error(error);
    }
});
exports.getAllOperations = getAllOperations;
const getByIdOperation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const result = yield database_1.AppDataSourse.query("SELECT * FROM operation WHERE id = $1", [id]);
        if (result.length === 0) {
            return res.status(404).json({
                message: "Operation not found",
            });
        }
        return res.json(result);
    }
    catch (error) {
        console.log(error);
        return;
    }
});
exports.getByIdOperation = getByIdOperation;
const putOperation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { id_vehicle, id_supplier, id_driver } = req.body;
        const update_ad = new Date();
        const result = yield database_1.AppDataSourse.query("UPDATE operation SET id_vehicle = $1, id_supplier = $2, id_driver = $3, update_ad = $4 WHERE id = $5 RETURNING *", [id_vehicle, id_supplier, id_driver, update_ad, id]);
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
exports.putOperation = putOperation;
