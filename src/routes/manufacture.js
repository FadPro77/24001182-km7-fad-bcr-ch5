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
const { authorization } = require("../middlewares/auth");
const { adminRole } = require("../constant/auth");

const router = express.Router();

router
  .route("/")
  .get(getManufactures)
  .post(validateCreateManufacture, authorization(adminRole), createManufacture);

router
  .route("/:id")
  .get(validateGetManufactureById, getManufactureById)
  .put(validateUpdateManufacture, authorization(adminRole), updateManufacture)
  .delete(
    validateDeleteManufactureById,
    authorization(adminRole),
    deleteManufactureById
  );

// router.get("/search", validateGetManufactures, getManufactures);

module.exports = router;
