const express = require("express");
const {
  validateGetAvailable,
  validateGetAvailableById,
  validateDeleteAvailableById,
  validateCreateAvailable,
  validateUpdateAvailable,
} = require("../middlewares/availablesValidation");
const {
  getAvailable,
  getAvailableById,
  deleteAvailableById,
  createAvailable,
  updateAvailable,
} = require("../controllers/availablesController");
const { authorization } = require("../middlewares/auth");
const { adminRole } = require("../constant/auth");

const router = express.Router();

router
  .route("/")
  .get(getAvailable)
  .post(validateCreateAvailable, authorization(adminRole), createAvailable);

router
  .route("/:id")
  .get(validateGetAvailableById, getAvailableById)
  .put(validateUpdateAvailable, authorization(adminRole), updateAvailable)
  .delete(
    validateDeleteAvailableById,
    authorization(adminRole),
    deleteAvailableById
  );

module.exports = router;
