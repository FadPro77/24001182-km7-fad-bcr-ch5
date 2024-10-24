const { z } = require("zod");
const { BadRequestError } = require("../utils/request");

exports.validateCreateTransmission = (req, res, next) => {
  const validateBody = z.object({
    transmission_name: z.string().min(1, "Nama transmisi tidak boleh kosong"),
  });

  try {
    validateBody.parse(req.body);
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Invalid data", errors: error.errors });
  }

  next();
};

exports.validateGetTransmissionById = (req, res, next) => {
  const validateParams = z.object({
    id: z.string(),
  });

  const result = validateParams.safeParse(req.params);

  if (!result.success) {
    throw new BadRequestError(result.error.errors);
  }

  next();
};

exports.validateUpdateTransmission = (req, res, next) => {
  const validateBody = z.object({
    transmission_name: z.string().optional(),
  });

  try {
    validateBody.parse(req.body);
  } catch (error) {
    return res.status(400).json({
      message: "Invalid request body",
      errors: error.errors,
    });
  }

  next();
};

exports.validateDeleteTransmissionById = (req, res, next) => {
  const validateParams = z.object({
    id: z.string(),
  });

  const result = validateParams.safeParse(req.params);
  if (!result.success) {
    throw new BadRequestError(result.error.errors);
  }
  next();
};
