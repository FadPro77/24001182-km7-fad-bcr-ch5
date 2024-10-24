const modelRepository = require("../repositories/modelsRepository");
const { imageUpload } = require("../utils/image-kit");
const { NotFoundError, InternalServerError } = require("../utils/request");

exports.getModels = async (
  model,
  capacity,
  transmission_name,
  type_name,
  manufacture_name,
  spec_name,
  option_name
) => {
  return modelRepository.getModels(
    model,
    capacity,
    transmission_name,
    type_name,
    manufacture_name,
    spec_name,
    option_name
  );
};

exports.getModelById = async (id) => {
  const model = await modelRepository.getModelById(id);
  if (!model) {
    throw new NotFoundError("Model is Not Found!");
  }

  return model;
};

exports.createModel = async (data) => {
  return modelRepository.createModel(data);
};

exports.updateModel = async (id, data) => {
  const existingModel = modelRepository.getModelById(id);
  if (!existingModel) {
    throw new NotFoundError("Model is Not Found!");
  }
  data = {
    ...existingModel,
    ...data,
  };

  const updatedModel = modelRepository.updateModel(id, data);
  if (!updatedModel) {
    throw new InternalServerError(["Failed to update model!"]);
  }

  return updatedModel;
};

exports.deleteModelById = async (id) => {
  const existingModel = await modelRepository.getModelById(id);
  if (!existingModel) {
    throw new NotFoundError("Model is Not Found!");
  }

  const deletedModel = await modelRepository.deleteModelById(id);
  if (!deletedModel) {
    throw new InternalServerError(["Failed to delete model!"]);
  }

  return existingModel;
};
