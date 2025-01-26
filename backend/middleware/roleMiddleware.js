const jwt = require("jsonwebtoken");

const roleMiddleware = (...allowedRoles) => {
    return (req, res, next) => {
        try {
            // Token Authorization se User Data Extract
            const token = req.header("Authorization");
            if (!token) return res.status(401).json({ message: "Access Denied" });

            // Token Verify karna
            const verified = jwt.verify(token, process.env.JWT_SECRET);
            req.user = verified;

            // Role Check
            if (!allowedRoles.includes(req.user.role)) {
                return res.status(403).json({ message: "You do not have permission to perform this action" });
            }

            next(); // Agar Role Allowed hai toh Next Middleware
        } catch (err) {
            res.status(400).json({ message: "Invalid Token" });
        }
    };
};

module.exports = roleMiddleware;
