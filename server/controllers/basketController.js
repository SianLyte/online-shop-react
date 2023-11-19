import ApiError from "../error/ApiError.js";
import { db } from "../models/models.js";

class BasketController {
  getAll = async (req, res) => {
    try {
      const userBasket = await db.basket.findOne({
        where: { userId: req.user.id },
      });
      const basketDevices = await db.basket_device.findAll({
        where: { basketId: userBasket.id },
        include: [{ model: db.device }],
      });
      return res.json(basketDevices);
    } catch (e) {}
  };
  addDevice = async (req, res, next) => {
    try {
      const userId = req.user.id;
      const basket = await db.basket.findOne({ where: { userId } });
      const deviceId = req.params.id;
      const findDevice = await db.basket_device.findOne({
        where: { deviceId, basketId: basket.id },
      });
      if (findDevice) {
        this.incrementAmount(findDevice, res);
      } else {
        await db.basket_device.create({
          deviceId,
          basketId: basket.id,
        });
        const device = await db.basket_device.findOne({
          where: { deviceId, basketId: basket.id },
        });
        return res.json({ device });
      }
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  };
  deleteDevice = async (req, res, next) => {
    try {
      const userId = req.user.id;
      const basket = await db.basket.findOne({ where: { userId } });
      const deviceId = req.params.id;
      const findDevice = await db.basket_device.findOne({
        where: { deviceId, basketId: basket.id },
      });
      if (findDevice) {
        return this.decrementAmount(findDevice, res);
      }
      return res.json("Не найден девайс");
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  };
  incrementAmount = async (device, response) => {
    await device.update({ amount: device.amount + 1 });
    return response.json({ device });
  };
  decrementAmount = async (device, response) => {
    if (device.amount > 1) {
      await device.update({ amount: device.amount - 1 });
    } else {
      await device.destroy();
    }
    return response.json({ device });
  };
}
export const basketController = new BasketController();
