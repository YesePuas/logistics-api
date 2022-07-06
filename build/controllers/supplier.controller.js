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
exports.putSupplier = exports.getamountVehicleBySupplier = exports.getByIdSupplier = exports.getAllSuppliers = exports.createSupplier = void 0;
const database_1 = require("../database");
const createSupplier = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { document_type, document_number, full_name, email } = req.body;
    try {
        const result = yield database_1.AppDataSourse.query("INSERT INTO supplier (document_type, document_number, full_name, email) VALUES ($1, $2, $3, $4) RETURNING *", [document_type, document_number, full_name, email]);
        res.json(result);
    }
    catch (error) {
        console.log("error.message", error.message);
        res.status(400).send(error.message);
    }
});
exports.createSupplier = createSupplier;
const getAllSuppliers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allSuppliers = yield database_1.AppDataSourse.query("SELECT * FROM supplier");
        res.json(allSuppliers);
    }
    catch (error) {
        console.error(error);
    }
});
exports.getAllSuppliers = getAllSuppliers;
const getByIdSupplier = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const result = yield database_1.AppDataSourse.query("SELECT * FROM supplier WHERE id = $1", [id]);
        if (result.length === 0) {
            return res.status(404).json({
                message: "Supplier not found",
            });
        }
        return res.json(result);
    }
    catch (error) {
        console.log(error);
        return;
    }
});
exports.getByIdSupplier = getByIdSupplier;
const getamountVehicleBySupplier = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const result = yield database_1.AppDataSourse.query("SELECT COUNT(operation.id) FROM supplier INNER JOIN operation on supplier.id = operation.id_supplier WHERE supplier.id = $1", [id]);
        return res.json(result);
    }
    catch (error) {
        console.log(error);
        return;
    }
});
exports.getamountVehicleBySupplier = getamountVehicleBySupplier;
const putSupplier = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { document_type, document_number, full_name, email, active } = req.body;
        const update_ad = new Date();
        const result = yield database_1.AppDataSourse.query("UPDATE supplier SET document_type = $1, document_number = $2, full_name = $3, email = $4, active = $5,  update_ad = $6 WHERE id = $7 RETURNING *", [document_type, document_number, full_name, email, active, update_ad, id]);
        console.log(result[0].length);
        if (result[0].length === 0) {
            return res.status(404).json({
                message: "Supplier not found",
            });
        }
        return res.json(result[0]);
    }
    catch (error) {
        return;
    }
});
exports.putSupplier = putSupplier;
