const { successResponse } = require("../utils/response");
const transmissionService = require("../services/transmissionsService");

exports.getTransmissions = async (req, res, next) => {
  const data = await transmissionService.getTransmissions(
    req.query?.transmission_name
  );
  successResponse(res, data);
};

exports.getTransmissionById = async (req, res, next) => {
  const transmission = await transmissionService.getTransmissionById(
    req.params.id
  );
  successResponse(res, transmission);
};
exports.createTransmission = async (req, res, next) => {
  const data = await transmissionService.createTransmission(req.body);
  successResponse(res, {
    message: "Transmission Created successfully !",
    data,
  });
};

exports.updateTransmission = async (req, res, next) => {
  const id = req.params.id;

  const data = await transmissionService.updateTransmission(id, req.body);
  successResponse(res, {
    message: "Transmission Updated Successfully !",
    data,
  });
};

exports.deleteTransmissionById = async (req, res, next) => {
  const data = await transmissionService.deleteTransmissionById(req.params.id);
  successResponse(res, {
    message: "Transmission Deleted Successfully !",
    data,
  });
};
