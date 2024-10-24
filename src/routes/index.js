const express = require("express");
const carRouter = require("./cars");
const optionsRouter = require("./options");
const modelsRouter = require("./models");
const specsRouter = require("./specs");
const manufactureRouter = require("./manufacture");
const transmissionsRouter = require("./transmissions");
const typesRouter = require("./types");
const availablesRouter = require("./availables");
const modeloptions = require("./modelOptions");
const modelspecs = require("./modelOptions");
const authRouter = require("./auth");

const router = express.Router();

router.use("/cars", carRouter);
router.use("/options", optionsRouter);
router.use("/models", modelsRouter);
router.use("/specs", specsRouter);
router.use("/manufactures", manufactureRouter);
router.use("/transmissions", transmissionsRouter);
router.use("/types", typesRouter);
router.use("/availables", availablesRouter);
router.use("/modeloptions", modeloptions);
router.use("/modelspecs", modelspecs);
router.use("/auth", authRouter);
module.exports = router;
