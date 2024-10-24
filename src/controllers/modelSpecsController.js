const modelSpecsService = require("../services/modelSpecsService");
const { successResponse } = require("../utils/response");

exports.getModelSpecs = async (req, res, next) => {
  const data = await modelSpecsService.getModels(
  );
  successResponse(res, data);
};

exports.getModelSpecsById = async (req, res, next) => {
  const { id } = req.params;
  const data = await modelSpecsService.getModelSpecsById(id);
  successResponse(res, data);
};

exports.createModelSpecs = async (req, res, next) => {
  const data = await modelSpecsService.createModelSpecs(req.body);
  successResponse(res, {
    message: "Model created successfully",
    data,
  });
};

exports.updateModelSpecs = async (req, res, next) => {
  const { id } = req.params;
  const data = await modelSpecsService.updateModelSpecs(id, req.body, req.files);
  successResponse(res, {
    message: "Model Updated successfully",
    data,
  });
};

exports.deleteModelSpecsById = async (req, res, next) => {
  const { id } = req.params;
  const data = await modelSpecsService.deleteModelSpecsById(id);
  successResponse(res, {
    message: "Model deleted successfully",
    data,
  });
};
