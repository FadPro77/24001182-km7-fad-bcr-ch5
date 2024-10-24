const { successResponse } = require("../utils/response");
const availableService = require("../services/availablesService");

exports.getAvailable = async (req, res, next) => {
  const data = await availableService.getAvailable();
  successResponse(res, data);
};

exports.getAvailableById = async (req, res, next) => {
  const data = await availableService.getAvailableById(req.params.id);
  successResponse(res, data);
};

exports.createAvailable = async (req, res, next) => {
  const data = await availableService.createAvailable(req.body);
  successResponse(res, {
    message: "Available Created Successfully!",
    data,
  });
};

exports.updateAvailable = async (req, res, next) => {
  const id = req.params.id;

  const data = await availableService.updateAvailable(id, req.body);
  successResponse(res, {
    message: "Available Updated Successfully!",
    data,
  });
};

exports.deleteAvailableById = async (req, res, next) => {
  const data = await availableService.deleteAvailableById(req.params. id);

  successResponse(res, {
    message: "Available Deleted successfully!",
    data,
  });
};
