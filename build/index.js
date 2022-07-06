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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
require("reflect-metadata");
const brand_router_1 = __importDefault(require("./routes/brand.router"));
const driver_router_1 = __importDefault(require("./routes/driver.router"));
const supplier_router_1 = __importDefault(require("./routes/supplier.router"));
const vehicle_router_1 = __importDefault(require("./routes/vehicle.router"));
const operation_router_1 = __importDefault(require("./routes/operation.router"));
const database_1 = require("./database");
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield database_1.AppDataSourse.initialize();
            const PORT = 3000;
            app_1.default.listen(PORT, () => {
                console.log(`Server running on port ${PORT}`);
            });
            app_1.default.use(brand_router_1.default, driver_router_1.default, supplier_router_1.default, vehicle_router_1.default, operation_router_1.default);
        }
        catch (error) {
            console.error(error);
        }
    });
}
main();
