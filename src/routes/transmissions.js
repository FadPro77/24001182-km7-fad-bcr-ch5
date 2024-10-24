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

const router = express.Router();

router
  .route("/")
  .get(getTransmissions)
  .post(validateCreateTransmission, createTransmission);

router
  .route("/:id")
  .get(validateGetTransmissionById, getTransmissionById)
  .put(validateUpdateTransmission, updateTransmission)
  .delete(validateDeleteTransmissionById, deleteTransmissionById);

module.exports = router;
