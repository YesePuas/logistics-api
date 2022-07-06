import app from "./app";
import "reflect-metadata";
import brandRoute from "./routes/brand.router";
import driverRoute from "./routes/driver.router";
import supplierRoute from "./routes/supplier.router";
import vehicleRoute from "./routes/vehicle.router";
import operationRoute from "./routes/operation.router";
import { AppDataSourse } from "./database";

async function main() {
  try {
    await AppDataSourse.initialize();
    const PORT = 3000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
    app.use(
      brandRoute,
      driverRoute,
      supplierRoute,
      vehicleRoute,
      operationRoute
    );
  } catch (error) {
    console.error(error);
  }
}

main();
