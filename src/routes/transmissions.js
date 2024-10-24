const express = require("express");
const {
  validateGetTransmissions,
  validateGetTransmissionById,
  validateDeleteTransmissionById,
  validateCreateTransmission,
  validateUpdateTransmission,
} = require("../middlewares/transmissionsValidation");
const {
  getTransmissions,
  getTransmissionById,
  deleteTransmissionById,
  createTransmission,
  updateTransmission,
} = require("../controllers/transmissionsController");
const { authorization } = require("../middlewares/auth");
const { adminRole } = require("../constant/auth");

const router = express.Router();

router
  .route("/")
  .get(getTransmissions)
  .post(
    validateCreateTransmission,
    authorization(adminRole),
    createTransmission
  );

router
  .route("/:id")
  .get(validateGetTransmissionById, getTransmissionById)
  .put(validateUpdateTransmission, authorization(adminRole), updateTransmission)
  .delete(
    validateDeleteTransmissionById,
    authorization(adminRole),
    deleteTransmissionById
  );

module.exports = router;
