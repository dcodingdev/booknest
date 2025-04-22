// import express from "express";
// const router = express.Router();
// import { registerUser, loginUser, currentUser } from "../controllers/userController.js";
// import validateToken from "../middleware/authMiddleware.js";

// router.post("/register", registerUser);
// router.post("/login", loginUser);
// router.get("/profile", validateToken, currentUser); // Fixed profile route

// export default router;

// import express from "express";
// import { registerUser, loginUser, currentUser } from "../controllers/userController.js";  // ✅ Correct import

// const router = express.Router();

// router.post("/register", registerUser);
// router.post("/login", loginUser);
// router.get("/current", currentUser);  // ✅ This route must exist

// export default router;

import express from "express";
import { verifyToken } from "../middleware/authMiddleware.js"; // ✅ Ensure correct import
import { registerUser, loginUser, currentUser } from "../controllers/userController.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

// ✅ Protected route to get current user
router.get("/profile", verifyToken, currentUser);

export default router;
