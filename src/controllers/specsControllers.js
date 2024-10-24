const specService = require("../services/specsServices");
const { successResponse } = require("../utils/response");

exports.getSpecs = async (req, res, next) => {
  const data = await specService.getSpecs(req.query?.spec_name);
  successResponse(res, data);
};

exports.getSpecById = async (req, res, next) => {
  const { id } = req.params;

  const data = await specService.getSpecById(id);
  successResponse(res, data);
};

exports.createSpec = async (req, res, next) => {
  const data = await specService.createSpec(req.body, req.files);
  successResponse(res, {
    message: "Specs created successfully",
    data,
  });
};

exports.updateSpec = async (req, res, next) => {
  const { id } = req.params;
  const data = await specService.updateSpec(id, req.body, req.files);
  successResponse(res, {
    message: "Specs updated successfully",
    data,
  });
};

exports.deleteSpecById = async (req, res, next) => {
  const { id } = req.params;
  const data = await specService.deleteSpecById(id);
  successResponse(res, {
    message: "Spec deleted successfully",
    data,
  });
};
