const { successResponse } = require("../utils/response");
const manufactureService = require("../services/manufacturesService");

exports.getManufactures = async (req, res, next) => {
  const data = await manufactureService.getManufactures(
    req.query?.manufacture_name,
    req.query?.manufacture_region,
    req.query?.year_establish
  );

  successResponse(res, data);
};

exports.getManufactureById = async (req, res, next) => {
  const data = await manufactureService.getManufactureById(req.params.id);
  successResponse(res, data);
};

exports.createManufacture = async (req, res, next) => {
  const data = await manufactureService.createManufacture(req.body, req.files);
  successResponse(res, {
    message: "Manufacture Created successfully!",
    data,
  });
};

exports.updateManufacture = async (req, res, next) => {
  const id = req.params.id;

  const data = await manufactureService.updateManufacture(id, req.body);
  successResponse(res, {
    message: "Manufacture Updated successfully!",
    data,
  });
};

exports.deleteManufactureById = async (req, res, next) => {
  const data = await manufactureService.deleteManufactureById(req.params.id);

  successResponse(res, {
    message: "Manufacture Deleted successfully!",
    data,
  });
};
