const { z } = require("zod");
const { BadRequestError } = require("../utils/request");

exports.validateCreateAvailable = (req, res, next) => {
  const validateBody = z.object({
    available_status: z
      .string()
      .min(1, "Status ketersediaan tidak boleh kosong"),
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

exports.validateGetAvailableById = (req, res, next) => {
  const validateParams = z.object({
    id: z.string(),
  });

  const result = validateParams.safeParse(req.params);
  if (!result.success) {
    throw new BadRequestError(result.error.errors);
  }

  next();
};

exports.validateUpdateAvailable = (req, res, next) => {
  const validateBody = z.object({
    available_status: z
      .string()
      .min(1, "Status ketersediaan tidak boleh kosong"),
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

exports.validateDeleteAvailableById = (req, res, next) => {
  const validateParams = z.object({
    id: z.string(),
  });

  const result = validateParams.safeParse(req.params);
  if (!result.success) {
    throw new BadRequestError(result.error.errors);
  }

  next();
};
