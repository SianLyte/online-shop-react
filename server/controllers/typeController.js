import { db } from "../models/models.js";
import ApiError from "../error/ApiError.js";

class TypeController {
  async create(req, res) {
    const { name } = req.body;
    const type = await db.type.create({
      name,
    });
    return res.json(type);
  }

  async getAll(req, res) {
    const types = await db.type.findAll();
    return res.json(types);
  }
}

export const typeController = new TypeController();
