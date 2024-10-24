const express = require("express");
const {
  validateGetSpecs,
  validateGetSpecById,
  validateDeleteSpecById,
  validateCreateSpec,
  validateUpdateSpec,
} = require("../middlewares/specsValidation");
const {
  getSpecs,
  getSpecById,
  deleteSpecById,
  createSpec,
  updateSpec,
} = require("../controllers/specsControllers");

const router = express.Router();

// It will be run the URL based on path and the method
router
  .route("/")
  .get(validateGetSpecs, getSpecs)
  .post(validateCreateSpec, createSpec);

router
  .route("/:id")
  .get(validateGetSpecById, getSpecById)
  .put(validateUpdateSpec, updateSpec)
  .delete(validateDeleteSpecById, deleteSpecById);

module.exports = router;
