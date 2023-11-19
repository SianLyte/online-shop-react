import ApiError from "../error/ApiError.js";
import { db } from "../models/models.js";

class RatingController {
  calculateAvgRating = async (deviceId) => {
    const device = await db.device.findOne({ where: { id: deviceId } });
    if (!device) {
      return res.status(404).json({ message: "Такого девайса не существует" });
    }

    const allRatings = await db.rating.findAndCountAll({
      where: { deviceId },
    });
    let totalSum = 0;
    allRatings.rows.forEach((element) => {
      totalSum += element.rate;
    });
    let rateAvg = 0;
    if (allRatings.count != 0) {
      rateAvg = totalSum / allRatings.count;
    }
    await device.update({ rating: rateAvg });
  };

  create = async (req, res, next) => {
    try {
      const { rate, deviceId, description } = req.body;
      if (rate > 5 || rate < 1) {
        return res.status(404).json({ message: "Направильный рейтинг" });
      }
      const userId = req.user.id;
      const existRating = await db.rating.findOne({
        where: {
          userId,
          deviceId,
        },
      });
      if (existRating) {
        return res
          .status(404)
          .json({ message: "Вы уже оставляли отзыв на этот продукт" });
      }

      const rating = await db.rating.create({
        rate,
        description,
        deviceId,
        userId,
      });
      await this.calculateAvgRating(deviceId);

      return res.json({ rating });
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  };

  getAll = async (req, res) => {
    const all = await db.rating.findAll();
    return res.json({ all });
  };
  getCount = async (req, res, next) => {
    try {
      const deviceId = req.query.deviceId;
      const count = await db.rating.count({ where: { deviceId } });
      return res.json({ count });
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  };

  delete = async (req, res, next) => {
    try {
      const { deviceId } = req.body;
      const userId = req.user.id;
      const rating = await db.rating.findOne({ where: { deviceId, userId } });
      await rating.destroy();
      await this.calculateAvgRating(deviceId);

      return res.json({ rating });
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  };
}
export const ratingController = new RatingController();
