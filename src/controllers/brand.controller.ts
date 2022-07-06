import { AppDataSourse } from "../database";
import { BrandEntry } from "../interfaces/brand";
import { Request, Response } from "express";

export const createBrand = async (req: Request, res: Response) => {
  const { denomination } = req.body;
  try {
    const result: BrandEntry = await AppDataSourse.query(
      "INSERT INTO brand (denomination) VALUES ($1) RETURNING *",
      [denomination]
    );
    res.json(result);
  } catch (error: any) {
    console.log("error.message", error.message);
    res.status(400).send(error.message);
  }
};

export const getAllBrands = async (req: Request, res: Response) => {
  try {
    const allBrands = await AppDataSourse.query("SELECT * FROM brand");
    res.json(allBrands);
  } catch (error) {
    console.error(error);
  }
};

export const getByIdBrand = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result: BrandEntry[] = await AppDataSourse.query(
      "SELECT * FROM brand WHERE id = $1",
      [id]
    );
    if (result.length === 0) {
      return res.status(404).json({
        message: "Brand not found",
      });
    }
    return res.json(result);
  } catch (error) {
    console.log(error);
    return;
  }
};

export const putBrand = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { denomination } = req.body;
    const update_ad = new Date();
    const result = await AppDataSourse.query(
      "UPDATE brand SET denomination = $1 , update_ad = $2 WHERE id = $3 RETURNING *",
      [denomination, update_ad, id]
    );
    console.log(result[0].length);
    if (result[0].length === 0) {
      return res.status(404).json({
        message: "Brand not found",
      });
    }
    return res.json(result[0]);
  } catch (error) {
    return;
  }
};
