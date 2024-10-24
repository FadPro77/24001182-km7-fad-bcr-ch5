const { z } = require("zod");
const { BadRequestError } = require("../utils/request");

exports.validateGetModelSpecs = (req, res, next) => {
  const validateQuery = z.object({});

  const resultValidateQuery = validateQuery.safeParse(req.query);
  if (!resultValidateQuery.success) {
    throw new BadRequestError(resultValidateQuery.error.errors);
  }
  next();
};

exports.validateGetModelSpecsById = (req, res, next) => {
  const validateParams = z.object({
    id: z.string(),
  });
  const result = validateParams.safeParse(req.params);
  if (!result.success) {
    throw new BadRequestError(result.error.errors);
  }
  next();
};

exports.validateDeleteModelSpecsById = (req, res, next) => {
  const validateBody = z.object({});

  const result = validateBody.safeParse(req.body);
  if (!result.success) {
    throw new BadRequestError(result.error.errors);
  }
  next();
};

exports.validateCreateModelSpecs = (req, res, next) => {
  const validateParams = z.object({
    id: z.string(),
  });

  const resultValidateParams = validateParams.safeParse(req.params);
  if (!resultValidateParams.success) {
    throw new BadRequestError(resultValidateParams.error.errors);
  }

  const validateBody = z.object({});

  const resultValidateBody = validateBody.safeParse(req.body);
  if (!resultValidateBody.success) {
    throw new BadRequestError(resultValidateBody.error.errors);
  }

  next();
};

exports.validateUpdateModelSpecs = (req, res, next) => {
  const validateParams = z.object({
    id: z.string(),
  });

  const result = validateParams.safeParse(req.params);
  if (!result.success) {
    throw new BadRequestError(result.error.errors);
  }

  next();
};
