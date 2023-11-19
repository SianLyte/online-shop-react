import { v4 } from "uuid";
import path from "path";
import { fileURLToPath } from "url";
import { db } from "../models/models.js";
import ApiError from "../error/ApiError.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class DeviceController {
  async create(req, res, next) {
    try {
      const { name, price, brandId, typeId, info } = req.body;
      const { img } = req.files;
      let fileName = v4() + ".jpg";
      img.mv(path.resolve(__dirname, "..", "static", fileName));

      const device = await db.device.create({
        name,
        price,
        brandId,
        typeId,
        img: fileName,
      });
      if (info) {
        let infoa = JSON.parse(info);
        infoa.forEach((inf) => {
          db.device_info.create({
            title: inf.title,
            description: inf.description,
            deviceId: device.id,
          });
        });
      }
      return res.json(device);
    } catch (error) {
      next(ApiError.badRequest(error.message));
    }
  }

  async getAll(req, res, next) {
    try {
      const { brandId, typeId, limit, page } = req.query;

      let filter = {};
      brandId ? (filter.brandId = brandId) : null;
      typeId ? (filter.typeId = typeId) : null;
      let options = { where: filter };
      limit ? (options.limit = limit) : null;
      page & limit ? (options.offset = limit * page - limit) : null;

      const devices = await db.device.findAndCountAll(options);
      return res.json(devices);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async getOne(req, res) {
    const id = req.params.id;
    const device = await db.device.findOne({
      where: { id },
      include: [{ model: db.device_info, as: "info" }],
    });
    return res.json(device);
  }

  async delete(req, res) {
    const id = req.params.id;

    const device = await db.device.findOne({
      where: { id },
    });

    await device.destroy();
    return res.json(device);
  }

  async rating(req, res) {}
}

export const deviceController = new DeviceController();
