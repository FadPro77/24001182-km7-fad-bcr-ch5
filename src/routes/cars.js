const express = require("express");
const carsController = require("../controllers/carsController");
const carsValidation = require("../middlewares/carsValidation");
const { authorization } = require("../middlewares/auth");
const { adminRole } = require("../constant/auth");

const router = express.Router();

router
  .route("/")
  .get(carsValidation.validateGetCars, carsController.getCars)
  .post(
    carsValidation.validateCreateCar,
    authorization(adminRole),
    carsController.createCar
  );
router
  .route("/:id")
  .get(carsValidation.validateGetCarById, carsController.getCarById)
  .put(
    carsValidation.validateUpdateCarById,
    authorization(adminRole),
    carsController.updateCarById
  )
  .delete(
    carsValidation.validateDeleteCarById,
    authorization(adminRole),
    carsController.deleteCarById
  );

module.exports = router;
