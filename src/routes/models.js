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
const { authorization } = require("../middlewares/auth");
const { adminRole } = require("../constant/auth");

const router = express.Router();

// It will be run the URL based on path and the method
router
  .route("/")
  .get(validateGetModels, getModels)
  .post(validateCreateModel, authorization(adminRole), createModel);

router
  .route("/:id")
  .get(validateGetModelById, getModelById)
  .put(validateUpdateModel, authorization(adminRole), updateModel)
  .delete(validateDeleteModelById, authorization(adminRole), deleteModelById);

module.exports = router;
