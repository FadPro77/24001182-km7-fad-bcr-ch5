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
const { authorization } = require("../middlewares/auth");
const { adminRole } = require("../constant/auth");

const router = express.Router();

// It will be run the URL based on path and the method
router
  .route("/")
  .get(validateGetSpecs, getSpecs)
  .post(validateCreateSpec, authorization(adminRole), createSpec);

router
  .route("/:id")
  .get(validateGetSpecById, getSpecById)
  .put(validateUpdateSpec, authorization(adminRole), updateSpec)
  .delete(validateDeleteSpecById, authorization(adminRole), deleteSpecById);

module.exports = router;
