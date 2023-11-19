import jwt from "jsonwebtoken";
export const checkRoleMiddleware = (role) => {
  return function (req, res, next) {
    try {
      const token = req.headers.authorization.split(" ")[1];
      if (!token) {
        res.status(401).json({ message: "Не авторизован" });
      }
      const user = jwt.verify(token, process.env.SECRET_KEY);
      if (user.role !== role) {
        res.status(403).json({ message: "У вас недостаточно прав" });
      } else {
        next();
        // res.status(405).json({ message: "У вас недостаточно прав" });
      }
    } catch (error) {
      res.status(401).json({ message: error });
    }
  };
};
