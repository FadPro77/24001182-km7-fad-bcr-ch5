const modelOptionsService = require("../services/modelOptionsService");
const { successResponse } = require("../utils/response");

exports.getModelOptions = async (req, res, next) => {
  const data = await modelOptionsService.getModels(
  );
  successResponse(res, data);
};

exports.getModelOptionsById = async (req, res, next) => {
  const { id } = req.params;
  const data = await modelOptionsService.getModelOptionsById(id);
  successResponse(res, data);
};

exports.createModelOptions = async (req, res, next) => {
  const data = await modelOptionsService.createModelOptions(req.body);
  successResponse(res, {
    message: "Model created successfully",
    data,
  });
};

exports.updateModelOptions = async (req, res, next) => {
  const { id } = req.params;
  const data = await modelOptionsService.updateModelOptions(id, req.body, req.files);
  successResponse(res, {
    message: "Model Updated successfully",
    data,
  });
};

exports.deleteModelOptionsById = async (req, res, next) => {
  const { id } = req.params;
  const data = await modelOptionsService.deleteModelOptionsById(id);
  successResponse(res, {
    message: "Model deleted successfully",
    data,
  });
};
