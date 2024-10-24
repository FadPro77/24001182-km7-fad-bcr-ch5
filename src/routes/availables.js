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

const router = express.Router();

router
  .route("/")
  .get(getAvailable)
  .post(validateCreateAvailable, createAvailable);

router
  .route("/:id")
  .get(validateGetAvailableById, getAvailableById)
  .put(validateUpdateAvailable, updateAvailable)
  .delete(validateDeleteAvailableById, deleteAvailableById);

module.exports = router;
