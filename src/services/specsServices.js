const specRepository = require("../repositories/specsRepository");
const { imageUpload } = require("../utils/image-kit");
const { NotFoundError, InternalServerError } = require("../utils/request");

exports.getSpecs = async (spec_name) => {
  return specRepository.getSpecs(spec_name);
};

exports.getSpecById = async (id) => {
  const spec = await specRepository.getSpecById(id);
  if (!spec) {
    throw new NotFoundError("Spec is Not Found!");
  }

  return spec;
};

exports.createSpec = async (data, file) => {
  return specRepository.createSpec(data);
};

exports.updateSpec = async (id, data, file) => {
  const existingSpec = specRepository.getSpecById(id);
  if (!existingSpec) {
    throw new NotFoundError("Spec is Not Found!");
  }

  data = {
    ...existingSpec,
    ...data,
  };

  const updatedSpec = specRepository.updateSpec(id, data);
  if (!updatedSpec) {
    throw new InternalServerError(["Failed to update spec!"]);
  }

  return updatedSpec;
};

exports.deleteSpecById = async (id) => {
  const existingSpec = await specRepository.getSpecById(id);
  if (!existingSpec) {
    throw new NotFoundError("Spec is Not Found!");
  }

  const deletedSpec = await specRepository.deleteSpecById(id);
  if (!deletedSpec) {
    throw new InternalServerError(["Failed to delete spec!"]);
  }

  return existingSpec;
};
