const express = require("express");
const {
  validateGetTypes,
  validateGetTypeById,
  validateDeleteTypeById,
  validateCreateType,
  validateUpdateType,
} = require("../middlewares/typesValidatiion");
const {
  getTypes,
  getTypeById,
  deleteTypeById,
  createType,
  updateType,
} = require("../controllers/typesController");
const { authorization } = require("../middlewares/auth");
const { adminRole } = require("../constant/auth");

const router = express.Router();

router
  .route("/")
  .get(getTypes)
  .post(validateCreateType, authorization(adminRole), createType);

router
  .route("/:id")
  .get(validateGetTypeById, getTypeById)
  .put(validateUpdateType, authorization(adminRole), updateType)
  .delete(validateDeleteTypeById, authorization(adminRole), deleteTypeById);

module.exports = router;
