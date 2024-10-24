const { z } = require("zod");
const { BadRequestError } = require("../utils/request");

exports.validateCreateType = (req, res, next) => {
  const validateBody = z.object({
    type_name: z.string().min(1, "Nama tipe tidak boleh kosong"),
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

exports.validateGetTypeById = (req, res, next) => {
  const validateParams = z.object({
    id: z.string(),
  });

  const result = validateParams.safeParse(req.params);

  if (!result.success) {
    throw new BadRequestError(result.error.errors);
  }

  next();
};

exports.validateUpdateType = (req, res, next) => {
  const validateBody = z.object({
    type_name: z.string().min(1, "Nama tipe tidak boleh kosong"),
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

exports.validateDeleteTypeById = (req, res, next) => {
  const validateParams = z.object({
    id: z.string(),
  });

  const result = validateParams.safeParse(req.params);
  if (!result.success) {
    throw new BadRequestError(result.error.errors);
  }

  next();
};
