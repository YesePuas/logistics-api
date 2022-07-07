import { AppDataSourse } from "../database";
import { SupplierEntry } from "../interfaces/supplier";
import { Request, Response } from "express";

export const createSupplier = async (req: Request, res: Response) => {
  const { document_type, document_number, full_name, email, address } =
    req.body;
  try {
    const result: SupplierEntry = await AppDataSourse.query(
      "INSERT INTO supplier (document_type, document_number, full_name, email, address) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [document_type, document_number, full_name, email, address]
    );
    res.json(result);
  } catch (error: any) {
    console.log("error.message", error.message);
    res.status(400).send(error.message);
  }
};

export const getAllSuppliers = async (req: Request, res: Response) => {
  try {
    const allSuppliers = await AppDataSourse.query(
      "select supplier.* , count(operation.id_vehicle)  FROM supplier LEFT JOIN operation on supplier.id = operation.id_supplier group by supplier.id;"
    );
    res.json(allSuppliers);
  } catch (error) {
    console.error(error);
  }
};

export const getByIdSupplier = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result: SupplierEntry[] = await AppDataSourse.query(
      "SELECT * FROM supplier WHERE id = $1",
      [id]
    );
    if (result.length === 0) {
      return res.status(404).json({
        message: "Supplier not found",
      });
    }
    return res.json(result);
  } catch (error) {
    console.log(error);
    return;
  }
};

export const getamountVehicleBySupplier = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;
    const result: number = await AppDataSourse.query(
      "SELECT COUNT(operation.id) FROM supplier INNER JOIN operation on supplier.id = operation.id_supplier WHERE supplier.id = $1",
      [id]
    );
    return res.json(result);
  } catch (error) {
    console.log(error);
    return;
  }
};

export const putSupplier = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const {
      document_type,
      document_number,
      full_name,
      email,
      address,
      active,
    } = req.body;
    const update_ad = new Date();
    const result = await AppDataSourse.query(
      "UPDATE supplier SET document_type = $1, document_number = $2, full_name = $3, email = $4, address=$5, active = $6, update_ad = $7 WHERE id = $8 RETURNING *",
      [
        document_type,
        document_number,
        full_name,
        email,
        address,
        active,
        update_ad,
        id,
      ]
    );
    console.log(result[0].length);
    if (result[0].length === 0) {
      return res.status(404).json({
        message: "Supplier not found",
      });
    }
    return res.json(result[0]);
  } catch (error) {
    return;
  }
};
