const { successResponse } = require("../utils/response");
const typeService = require("../services/typesService");

exports.getTypes = async (req, res, next) => {
  const data = await typeService.getTypes(req.query?.type_name);
  successResponse(res, data);
};

exports.getTypeById = async (req, res, next) => {
  const { id } = req.params;
  const data = await typeService.getTypeById(id);
  successResponse(res, data);
};

exports.createType = async (req, res, next) => {
  const data = await typeService.createType(req.body);
  successResponse(res, {
    message: "Type Created successfully !",
    data,
  });
};

exports.updateType = async (req, res, next) => {
  const id = req.params.id;

  const data = await typeService.updateType(id, req.body);
  successResponse(res, {
    message: "Type Updated successfully !",
    data,
  });
};

exports.deleteTypeById = async (req, res, next) => {
  const data = await typeService.deleteTypeById(req.params.id);
  successResponse(res, {
    message: "Type deleted successfully !",
    data,
  });
};
