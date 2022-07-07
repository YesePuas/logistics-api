import { AppDataSourse } from "../database";
import { VehicleEntry } from "../interfaces/vehicle";
import { Request, Response } from "express";

export const createVehicle = async (req: Request, res: Response) => {
  const { license_plate, model, sub_brand, id_brand } = req.body;
  try {
    const result: VehicleEntry = await AppDataSourse.query(
      "INSERT INTO vehicle (license_plate, model, sub_brand, id_brand) VALUES ($1, $2, $3, $4) RETURNING *",
      [license_plate, model, sub_brand, id_brand]
    );
    res.json(result);
  } catch (error: any) {
    console.log("error.message", error.message);
    res.status(400).send(error.message);
  }
};

export const getAllVehicles = async (req: Request, res: Response) => {
  try {
    const allVehicles = await AppDataSourse.query(
      "select distinct  vehicle.*, d.document_number, d.full_name, b.denomination  FROM vehicle LEFT JOIN operation on vehicle.id = operation.id_vehicle LEFT join driver d on d.id = operation.id_driver LEFT JOIN brand b on vehicle.id_brand = b.id"
    );
    res.json(allVehicles);
  } catch (error) {
    console.error(error);
  }
};

export const getByIdVehicle = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result: VehicleEntry[] = await AppDataSourse.query(
      "SELECT * FROM vehicle WHERE id = $1",
      [id]
    );
    if (result.length === 0) {
      return res.status(404).json({
        message: "Vehicle not found",
      });
    }
    return res.json(result);
  } catch (error) {
    console.log(error);
    return;
  }
};

export const putVehicle = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { license_plate, model, sub_brand, id_brand, active } = req.body;
    const update_ad = new Date();
    const result = await AppDataSourse.query(
      "UPDATE vehicle SET license_plate = $1, model = $2, sub_brand = $3, id_brand = $4, active = $5,  update_ad = $6 WHERE id = $7 RETURNING *",
      [license_plate, model, sub_brand, id_brand, active, update_ad, id]
    );
    console.log(result[0].length);
    if (result[0].length === 0) {
      return res.status(404).json({
        message: "Vehicle not found",
      });
    }
    return res.json(result[0]);
  } catch (error) {
    return;
  }
};
