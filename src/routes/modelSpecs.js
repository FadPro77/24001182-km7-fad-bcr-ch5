const express = require("express");
const {
  validateGetModelSpecs,
  validateGetModelSpecsById,
  validateDeleteModelSpecsById,
  validateCreateModelSpecs,
  validateUpdateModelSpecs,
} = require("../middlewares/modelSpecsValidation");
const {
  getModelSpecs,
  getModelSpecsById,
  deleteModelSpecsById,
  createModelSpecs,
  updateModelSpecs,
} = require("../controllers/ModelSpecsControllers");

const router = express.Router();

router
  .route("/")
  .get(validateGetModelSpecs, getModelSpecs)
  .post(validateCreateModelSpecs, createModelSpecs);

router
  .route("/:id")
  .get(validateGetModelSpecsById, getModelSpecsById)
  .put(validateUpdateModelSpecs, updateModelSpecs)
  .delete(validateDeleteModelSpecsById, deleteModelSpecsById);

module.exports = router;
