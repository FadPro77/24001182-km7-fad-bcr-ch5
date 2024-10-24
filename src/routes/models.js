const express = require("express");
const {
  validateGetModels,
  validateGetModelById,
  validateDeleteModelById,
  validateCreateModel,
  validateUpdateModel,
} = require("../middlewares/modelsValidation");
const {
  getModels,
  getModelById,
  deleteModelById,
  createModel,
  updateModel,
} = require("../controllers/modelsControllers");

const router = express.Router();

// It will be run the URL based on path and the method
router
  .route("/")
  .get(validateGetModels, getModels)
  .post(validateCreateModel, createModel);

router
  .route("/:id")
  .get(validateGetModelById, getModelById)
  .put(validateUpdateModel, updateModel)
  .delete(validateDeleteModelById, deleteModelById);

module.exports = router;
