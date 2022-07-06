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
exports.putBrand = exports.getByIdBrand = exports.getAllBrands = exports.createBrand = void 0;
const database_1 = require("../database");
const createBrand = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { denomination } = req.body;
    try {
        const result = yield database_1.AppDataSourse.query("INSERT INTO brand (denomination) VALUES ($1) RETURNING *", [denomination]);
        res.json(result);
    }
    catch (error) {
        console.log("error.message", error.message);
        res.status(400).send(error.message);
    }
});
exports.createBrand = createBrand;
const getAllBrands = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allBrands = yield database_1.AppDataSourse.query("SELECT * FROM brand");
        res.json(allBrands);
    }
    catch (error) {
        console.error(error);
    }
});
exports.getAllBrands = getAllBrands;
const getByIdBrand = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const result = yield database_1.AppDataSourse.query("SELECT * FROM brand WHERE id = $1", [id]);
        if (result.length === 0) {
            return res.status(404).json({
                message: "Brand not found",
            });
        }
        return res.json(result);
    }
    catch (error) {
        console.log(error);
        return;
    }
});
exports.getByIdBrand = getByIdBrand;
const putBrand = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { denomination } = req.body;
        const update_ad = new Date();
        const result = yield database_1.AppDataSourse.query("UPDATE brand SET denomination = $1 , update_ad = $2 WHERE id = $3 RETURNING *", [denomination, update_ad, id]);
        console.log(result[0].length);
        if (result[0].length === 0) {
            return res.status(404).json({
                message: "Brand not found",
            });
        }
        return res.json(result[0]);
    }
    catch (error) {
        return;
    }
});
exports.putBrand = putBrand;
