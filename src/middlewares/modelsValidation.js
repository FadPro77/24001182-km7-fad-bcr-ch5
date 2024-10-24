const { z } = require("zod");
const { BadRequestError } = require("../utils/request");

exports.validateGetModels = (req, res, next) => {
  const validateQuery = z.object({
    model_name: z.string().optional().nullable(),
    capacity: z.string().optional().nullable(),
    transmission_name: z.string().optional().nullable(),
    type_name: z.string().optional().nullable(),
    manufacture_name: z.string().optional().nullable(),
    spec_name: z.string().optional().nullable(),
    option_name: z.string().optional().nullable(),
  });

  const resultValidateQuery = validateQuery.safeParse(req.query);
  if (!resultValidateQuery.success) {
    throw new BadRequestError(resultValidateQuery.error.errors);
  }
  next();
};

exports.validateGetModelById = (req, res, next) => {
  const validateParams = z.object({
    id: z.string(),
  });
  const result = validateParams.safeParse(req.params);
  if (!result.success) {
    throw new BadRequestError(result.error.errors);
  }
  next();
};

exports.validateCreateModel = (req, res, next) => {
  const validateBody = z.object({
    model_name: z.string(),
    transmission_id: z.string(),
    capacity: z.string(),
    type_id: z.string(),
    manufacture_id: z.string(),
    option_id: z.array(z.string()),
    spec_id: z.array(z.string()),
  });

  const result = validateBody.safeParse(req.body);
  if (!result.success) {
    throw new BadRequestError(result.error.errors);
  }
  next();
};

exports.validateUpdateModel = (req, res, next) => {
  const validateParams = z.object({
    id: z.string(),
  });

  const resultValidateParams = validateParams.safeParse(req.params);
  if (!resultValidateParams.success) {
    throw new BadRequestError(resultValidateParams.error.errors);
  }

  const validateBody = z.object({
    model_name: z.string(),
    transmission_id: z.string(),
    capacity: z.string(),
    type_id: z.string(),
    manufacture_id: z.string(),
    option_id: z.array(z.string()),
    spec_id: z.array(z.string()),
  });

  const resultValidateBody = validateBody.safeParse(req.body);
  if (!resultValidateBody.success) {
    throw new BadRequestError(resultValidateBody.error.errors);
  }

  next();
};

exports.validateDeleteModelById = (req, res, next) => {
  const validateParams = z.object({
    id: z.string(),
  });

  const result = validateParams.safeParse(req.params);
  if (!result.success) {
    throw new BadRequestError(result.error.errors);
  }

  next();
};
