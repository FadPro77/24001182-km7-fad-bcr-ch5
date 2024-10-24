const modelOptionsRepository = require("../repositories/modelOptionsRepository")
const { imageUpload } = require("../utils/image-kit");
const { NotFoundError, InternalServerError } = require("../utils/request");

exports.getModelOptions = async (
  
) => {
  return modelOptionsRepository.getModelOptions(
   
  );
};

exports.getModelOptionsById = async (id) => {
  const model = await modelOptionsRepository.getModelOptionsById(id);
  if (!model) {
    throw new NotFoundError("Options is Not Found!");
  }

  return model;
};

exports.createModelOptions = async (data) => {
  return modelOptionsRepository.createModelOptions(data);
};

exports.updateModelOptions = async (id, data) => {
  const existingModel = modelOptionsRepository.getModelOptionsById(id);
  if (!existingModel) {
    throw new NotFoundError("Options is Not Found!");
  }
  data = {
    ...existingModel,
    ...data,
  };

  const updateModelOptions = modelOptionsRepository.updateModelOptions(id, data);
  if (!updateModelOptions) {
    throw new InternalServerError(["Failed to update options!"]);
  }

  return updateModelOptions;
};

exports.deleteModelOptionsById = async (id) => {
  const existingModelOptions = await modelOptionsRepository.getModelOptionsById(id);
  if (!existingModelOptions) {
    throw new NotFoundError("Options is Not Found!");
  }

  const deletedModelOptions = await modelOptionsRepository.deleteModelOptionsById(id);
  if (!deletedModelOptions) {
    throw new InternalServerError(["Failed to delete options!"]);
  }

  return existingModelOptions;
};
