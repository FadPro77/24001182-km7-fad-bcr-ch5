const express = require("express");
const {
  validateGetManufactures,
  validateGetManufactureById,
  validateDeleteManufactureById,
  validateCreateManufacture,
  validateUpdateManufacture,
} = require("../middlewares/manufacturesValidation");
const {
  getManufactures,
  getManufactureById,
  deleteManufactureById,
  createManufacture,
  updateManufacture,
} = require("../controllers/manufacturesController");

const router = express.Router();

router
  .route("/")
  .get(getManufactures)
  .post(validateCreateManufacture, createManufacture);

router
  .route("/:id")
  .get(validateGetManufactureById, getManufactureById)
  .put(validateUpdateManufacture, updateManufacture)
  .delete(validateDeleteManufactureById, deleteManufactureById);

// router.get("/search", validateGetManufactures, getManufactures);

module.exports = router;
