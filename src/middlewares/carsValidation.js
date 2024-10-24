const { z } = require("zod");
const { BadRequestError } = require("../utils/request");

exports.validateGetCars = (req, res, next) => {
  const validateQuery = z.object({
    model_name: z.string().optional(),
    manufacture_name: z.string().optional(),
    manufacture_region: z.string().optional(),
    year: z.coerce.number().optional(),
    plate: z.string().optional(),
    rentPerDay: z.coerce.number().optional(),
    capacity: z.coerce.number().optional(),
    transmission_name: z.string().optional(),
    type_name: z.string().optional(),
    available_status: z.string().optional(),
    availableAt: z.string().optional(),
    option_name: z.string().optional(),
    spec_name: z.string().optional(),
  });

  const resultValidateQuery = validateQuery.safeParse(req.query);
  if (!resultValidateQuery.success) {
    throw new BadRequestError(resultValidateQuery.error.errors);
  }
  next();
};

exports.validateGetCarById = (req, res, next) => {
  const validateParams = z.object({
    id: z.coerce.number(),
  });

  const resultValidateParams = validateParams.safeParse(req.params);
  if (!resultValidateParams.success) {
    throw new BadRequestError(resultValidateParams.error.errors);
  }
  req.params = resultValidateParams.data;

  next();
};

exports.validateCreateCar = (req, res, next) => {
  const validateBody = z.object({
    plate: z.string(),
    model_id: z.coerce.number(),
    rentPerDay: z.coerce.number(),
    description: z.string(),
    availableAt: z.string(),
    availability_id: z.coerce.number(),
    year: z.coerce.number(),
  });

  const validateFileBody = z
    .object({
      image: z
        .object({
          name: z.string(),
          data: z.any(),
        })
        .nullable()
        .optional(),
    })
    .nullable()
    .optional();

  const resultValidateBody = validateBody.safeParse(req.body);
  if (!resultValidateBody.success) {
    throw new BadRequestError(resultValidateBody.error.errors);
  }
  const resultvalidateFileBody = validateFileBody.safeParse(req.files);
  if (!resultvalidateFileBody.success) {
    throw new BadRequestError(resultvalidateFileBody.error.errors);
  }
  req.body = resultValidateBody.data;
  next();
};

exports.validateUpdateCarById = (req, res, next) => {
  const validateParams = z.object({
    id: z.coerce.number(),
  });

  const resultValidateParams = validateParams.safeParse(req.params);
  if (!resultValidateParams.success) {
    throw new BadRequestError(resultValidateParams.error.errors);
  }
  req.params = resultValidateParams.data;

  const validateBody = z.object({
    plate: z.string(),
    model_id: z.coerce.number(),
    rentPerDay: z.coerce.number(),
    description: z.string(),
    availableAt: z.string(),
    availability_id: z.coerce.number(),
    year: z.coerce.number(),
  });

  const validateFileBody = z
    .object({
      image: z
        .object({
          name: z.string(),
          data: z.any(),
        })
        .nullable()
        .optional(),
    })
    .nullable()
    .optional();

  const resultValidateBody = validateBody.safeParse(req.body);
  if (!resultValidateBody.success) {
    throw new BadRequestError(resultValidateBody.error.errors);
  }

  const resultvalidateFileBody = validateFileBody.safeParse(req.files);
  if (!resultvalidateFileBody.success) {
    throw new BadRequestError(resultvalidateFileBody.error.errors);
  }
  req.body = resultValidateBody.data;
  next();
};

exports.validateDeleteCarById = (req, res, next) => {
  const validateParams = z.object({
    id: z.coerce.number(),
  });

  const resultValidateParams = validateParams.safeParse(req.params);
  if (!resultValidateParams.success) {
    throw new BadRequestError(resultValidateParams.error.errors);
  }
  req.params = resultValidateParams.data;
  next();
};
