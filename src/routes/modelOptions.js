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

const router = express.Router();

router
  .route("/")
  .get(validateGetModelOptions, getModelOptions)
  .post(validateCreateModelOptions, createModelOptions);

router
  .route("/:id")
  .get(validateGetModelOptionsById, getModelOptionsById)
  .put(validateUpdateModelOptions, updateModelOptions)
  .delete(validateDeleteModelOptionsById, deleteModelOptionsById);

module.exports = router;
