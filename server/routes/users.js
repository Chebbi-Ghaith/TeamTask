const express = require("express");
const { getUsers, getUser } = require("../controllers/users");
const { protect, authorize } = require("../middleware/auth");

const router = express.Router();

router.use(protect); // Protect all routes
router.use(authorize("manager")); // Only managers can access these routes

router.get("/", getUsers);
router.get("/:id", getUser);

module.exports = router;
