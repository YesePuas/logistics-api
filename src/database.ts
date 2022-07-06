import { DataSource } from "typeorm";

export const AppDataSourse = new DataSource({
  type: "postgres",
  host: "localhost",
  username: "postgres",
  password: "yese",
  port: 5432,
  database: "softtek",
  logging: true,
});
