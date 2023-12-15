import jwt from "jsonwebtoken";


export const verifyJWT = (allowedRoles) => (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (!authHeader?.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) return res.status(403).json({ message: "Forbidden" });
        const { role } = decoded.UserInfo;        // Check if the user's role is allowed
        if (!allowedRoles.includes(role)) {
            return res.status(403).json({ message: "Forbidden for this user role" });
        }

        // Proceed for allowed roles
        next();
    });
};