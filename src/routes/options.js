const express = require("express");
const optionsController = require("../controllers/optionsController");
const optionsValidation = require("../middlewares/optionsValidation");
const { authorization } = require("../middlewares/auth");
const { adminRole } = require("../constant/auth");

const router = express.Router();

router
  .route("/")
  .get(optionsValidation.validateGetOptions, optionsController.getOptions)
  .post(
    optionsValidation.validateCreateOptions,
    authorization(adminRole),
    optionsController.createOptions
  );

router
  .route("/:id")
  .get(
    optionsValidation.validateGetOptionsById,
    optionsController.getOptionsById
  )
  .put(
    optionsValidation.validateUpdateOptions,
    authorization(adminRole),
    optionsController.updateOptions
  )
  .delete(
    optionsValidation.validateDeleteOptionsById,
    authorization(adminRole),
    optionsController.deleteOptionsById
  );

module.exports = router;
