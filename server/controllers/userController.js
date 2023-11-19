import ApiError from "../error/ApiError.js";
import { db } from "../models/models.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const generateJwt = (id, email, role) => {
  return jwt.sign({ id, email, role }, process.env.SECRET_KEY, {
    expiresIn: "24h",
  });
};
class UserController {
  async register(req, res, next) {
    const { email, password, role } = req.body;
    if (!email || !password) {
      return next(ApiError.badRequest("Некорректный email или пароль"));
    }

    const candidate = await db.user.findOne({ where: { email } });
    if (candidate) {
      return next(
        ApiError.badRequest("Пользователь с таким email уже существует")
      );
    }

    const hashPassword = await bcrypt.hash(password, 5);
    const user = await db.user.create({ email, role, password: hashPassword });
    const basket = await db.basket.create({ userId: user.id });
    const token = generateJwt(user.id, email, role);
    return res.json({ token, id: user.id, role: user.role });
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const user = await db.user.findOne({ where: { email } });
      if (!user) {
        return next(ApiError.badRequest("Пользователь не найден"));
      }
      if (!(await bcrypt.compare(password, user.password))) {
        return next(ApiError.badRequest("Неверный пароль"));
      }
      const token = generateJwt(user.id, email, user.role);
      return res.json({ token, id: user.id });
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async check(req, res, next) {
    try {
      const token = generateJwt(req.user.id, req.user.email, req.user.role);
      return res.json({ token, id: req.user.id });
    } catch (error) {
      next(ApiError.badRequest(error.message));
    }
  }
}

export const userController = new UserController();
