const { z, optional } = require("zod");
const { BadRequestError } = require("../utils/request");

exports.validateCreateManufacture = (req, res, next) => {
  req.body.year_establish = parseInt(req.body.year_establish);

  const validateBody = z.object({
    manufacture_name: z.string().min(1, "Nama manufaktur tidak boleh kosong"),
    manufacture_region: z
      .string()
      .min(1, "Wilayah manufaktur tidak boleh kosong"),
    year_establish: z
      .number()
      .int()
      .positive()
      .max(
        new Date().getFullYear(),
        "Tahun harus tidak lebih dari tahun sekarang"
      ),
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

exports.validateGetManufactureById = (req, res, next) => {
  const validateParams = z.object({
    id: z.string(),
  });

  const result = validateParams.safeParse(req.params);
  if (!result.success) {
    throw new BadRequestError(result.error.errors);
  }

  next();
};

exports.validateUpdateManufacture = (req, res, next) => {
  req.body.year_establish = parseInt(req.body.year_establish);

  const validateBody = z.object({
    manufacture_name: z.string(),
    manufacture_region: z.string(),
    year_establish: z
      .number()
      .int()
      .positive()
      .max(
        new Date().getFullYear(),
        "Tahun harus tidak lebih dari tahun sekarang"
      ),
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

exports.validateDeleteManufactureById = (req, res, next) => {
  const validateParams = z.object({
    id: z.string(),
  });

  const result = validateParams.safeParse(req.params);
  if (!result.success) {
    throw new BadRequestError(result.error.errors);
  }

  next();
};
