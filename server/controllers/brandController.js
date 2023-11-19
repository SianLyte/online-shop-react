import { db } from "../models/models.js";

class BrandController {
  async create(req, res) {
    const { name } = req.body;
    const brand = await db.brand.create({
      name,
    });
    return res.json(brand);
  }

  async getAll(req, res) {
    const brands = await db.brand.findAll();
    return res.json(brands);
  }
}

export const brandController = new BrandController();
