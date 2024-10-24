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

const router = express.Router();

router.route("/").get(getTypes).post(validateCreateType, createType);

router
  .route("/:id")
  .get(validateGetTypeById, getTypeById)
  .put(validateUpdateType, updateType)
  .delete(validateDeleteTypeById, deleteTypeById);

module.exports = router;
