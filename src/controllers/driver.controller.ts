import { AppDataSourse } from "../database";
import { DriverEntry } from "../interfaces/driver";
import { Request, Response } from "express";

export const createDriver = async (req: Request, res: Response) => {
  const { document_type, document_number, full_name } = req.body;
  try {
    const result: DriverEntry = await AppDataSourse.query(
      "INSERT INTO driver (document_type, document_number, full_name) VALUES ($1, $2, $3) RETURNING *",
      [document_type, document_number, full_name]
    );
    res.json(result);
  } catch (error: any) {
    console.log("error.message", error.message);
    res.status(400).send(error.message);
  }
};

export const getAllDrivers = async (req: Request, res: Response) => {
  try {
    const allDrivers = await AppDataSourse.query("SELECT * FROM driver");
    res.json(allDrivers);
  } catch (error) {
    console.error(error);
  }
};

export const getByIdDriver = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result: DriverEntry[] = await AppDataSourse.query(
      "SELECT * FROM driver WHERE id = $1",
      [id]
    );
    if (result.length === 0) {
      return res.status(404).json({
        message: "Driver not found",
      });
    }
    return res.json(result);
  } catch (error) {
    console.log(error);
    return;
  }
};

export const putDriver = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { document_type, document_number, full_name, active } = req.body;
    const update_ad = new Date();
    const result = await AppDataSourse.query(
      "UPDATE driver SET document_type = $1, document_number = $2, full_name = $3, active = $4, update_ad = $5 WHERE id = $6 RETURNING *",
      [document_type, document_number, full_name, active, update_ad, id]
    );
    console.log(result[0].length);
    if (result[0].length === 0) {
      return res.status(404).json({
        message: "Driver not found",
      });
    }
    return res.json(result[0]);
  } catch (error) {
    return;
  }
};
