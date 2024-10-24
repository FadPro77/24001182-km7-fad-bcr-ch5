const express = require("express");
const {
  validateGetModelOptions,
  validateGetModelOptionsById,
  validateDeleteModelOptionsById,
  validateCreateModelOptions,
  validateUpdateModelOptions,
} = require("../middlewares/modelOptionsValidation");
const {
  getModelOptions,
  getModelOptionsById,
  deleteModelOptionsById,
  createModelOptions,
  updateModelOptions,
} = require("../controllers/modelOptionsController");
const { authorization } = require("../middlewares/auth");
const { adminRole } = require("../constant/auth");

const router = express.Router();

router
  .route("/")
  .get(validateGetModelOptions, getModelOptions)
  .post(
    validateCreateModelOptions,
    authorization(adminRole),
    createModelOptions
  );

router
  .route("/:id")
  .get(validateGetModelOptionsById, getModelOptionsById)
  .put(validateUpdateModelOptions, authorization(adminRole), updateModelOptions)
  .delete(
    validateDeleteModelOptionsById,
    authorization(adminRole),
    deleteModelOptionsById
  );

module.exports = router;
