"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSourse = void 0;
const typeorm_1 = require("typeorm");
exports.AppDataSourse = new typeorm_1.DataSource({
    type: "postgres",
    host: "localhost",
    username: "postgres",
    password: "yese",
    port: 5432,
    database: "softtek",
    logging: true,
});
