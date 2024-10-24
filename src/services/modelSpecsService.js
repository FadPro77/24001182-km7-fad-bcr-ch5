const modelSpecsRepository = require("../repositories/modelSpecsRepository")
const { imageUpload } = require("../utils/image-kit");
const { NotFoundError, InternalServerError } = require("../utils/request");

exports.getModelSpecs = async (
  
) => {
  return modelSpecsRepository.getModelSpecs(
   
  );
};

exports.getModelSpecsById = async (id) => {
  const model = await modelSpecsRepository.getModelSpecsById(id);
  if (!model) {
    throw new NotFoundError("Specs is Not Found!");
  }

  return model;
};

exports.createModelSpecs = async (data) => {
  return modelSpecsRepository.createModelSpecs(data);
};

exports.updateModelSpecs = async (id, data) => {
  const existingModel = modelSpecsRepository.getModelSpecsById(id);
  if (!existingModel) {
    throw new NotFoundError("Specs is Not Found!");
  }
  data = {
    ...existingModel,
    ...data,
  };

  const updateModelSpecs = modelSpecsRepository.updateModelSpecs(id, data);
  if (!updateModelSpecs) {
    throw new InternalServerError(["Failed to update spec!"]);
  }

  return updateModelSpecs;
};

exports.deleteModelSpecsById = async (id) => {
  const existingModelSpecs = await modelSpecsRepository.getModelSpecsById(id);
  if (!existingModelSpecs) {
    throw new NotFoundError("Specs is Not Found!");
  }

  const deletedModelSpecs = await modelSpecsRepository.deleteModelSpecsById(id);
  if (!deletedModelSpecs) {
    throw new InternalServerError(["Failed to delete spec!"]);
  }

  return existingModelSpecs;
};
