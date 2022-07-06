import { AppDataSourse } from "../database";
import { OperationEntry } from "../interfaces/operation";
import { Request, Response } from "express";

export const createOperation = async (req: Request, res: Response) => {
  const { id_vehicle, id_supplier, id_driver } = req.body;
  try {
    const result: OperationEntry = await AppDataSourse.query(
      "INSERT INTO operation (id_vehicle, id_supplier, id_driver) VALUES ($1, $2, $3) RETURNING *",
      [id_vehicle, id_supplier, id_driver]
    );
    res.json(result);
  } catch (error: any) {
    console.log("error.message", error.message);
    res.status(400).send(error.message);
  }
};

export const getAllOperations = async (req: Request, res: Response) => {
  try {
    const allOperation = await AppDataSourse.query("SELECT * FROM operation");
    res.json(allOperation);
  } catch (error) {
    console.error(error);
  }
};

export const getByIdOperation = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result: OperationEntry[] = await AppDataSourse.query(
      "SELECT * FROM operation WHERE id = $1",
      [id]
    );
    if (result.length === 0) {
      return res.status(404).json({
        message: "Operation not found",
      });
    }
    return res.json(result);
  } catch (error) {
    console.log(error);
    return;
  }
};

export const putOperation = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { id_vehicle, id_supplier, id_driver } = req.body;
    const update_ad = new Date();
    const result = await AppDataSourse.query(
      "UPDATE operation SET id_vehicle = $1, id_supplier = $2, id_driver = $3, update_ad = $4 WHERE id = $5 RETURNING *",
      [id_vehicle, id_supplier, id_driver, update_ad, id]
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
