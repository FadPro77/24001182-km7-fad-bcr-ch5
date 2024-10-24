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
const { authorization } = require("../middlewares/auth");
const { adminRole } = require("../constant/auth");

const router = express.Router();

router
  .route("/")
  .get(validateGetModelSpecs, getModelSpecs)
  .post(validateCreateModelSpecs, authorization(adminRole), createModelSpecs);

router
  .route("/:id")
  .get(validateGetModelSpecsById, getModelSpecsById)
  .put(validateUpdateModelSpecs, authorization(adminRole), updateModelSpecs)
  .delete(
    validateDeleteModelSpecsById,
    authorization(adminRole),
    deleteModelSpecsById
  );

module.exports = router;
