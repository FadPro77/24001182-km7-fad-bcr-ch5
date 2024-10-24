const modelService = require("../services/modelsServices");
const { successResponse } = require("../utils/response");

exports.getModels = async (req, res, next) => {
  const data = await modelService.getModels(
    req.query?.model_name,
    req.query?.capacity,
    req.query?.transmission_name,
    req.query?.type_name,
    req.query?.manufacture_name,
    req.query?.spec_name,
    req.query?.option_name
  );
  successResponse(res, data);
};

exports.getModelById = async (req, res, next) => {
  const { id } = req.params;
  const data = await modelService.getModelById(id);
  successResponse(res, data);
};

exports.createModel = async (req, res, next) => {
  const data = await modelService.createModel(req.body);
  successResponse(res, {
    message: "Model created successfully",
    data,
  });
};

exports.updateModel = async (req, res, next) => {
  const { id } = req.params;
  const data = await modelService.updateModel(id, req.body, req.files);
  successResponse(res, {
    message: "Model Updated successfully",
    data,
  });
};

exports.deleteModelById = async (req, res, next) => {
  const { id } = req.params;
  const data = await modelService.deleteModelById(id);
  successResponse(res, {
    message: "Model deleted successfully",
    data,
  });
};
