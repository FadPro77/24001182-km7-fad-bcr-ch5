const typeRepository = require("../repositories/typesRepository");
const { imageUpload } = require("../utils/image-kit");

const { NotFoundError, InternalServerError } = require("../utils/request");

exports.getTypes =  async (type_name) => {

  const type = await typeRepository.getTypes(type_name);
  if (!type.length) {
    throw new NotFoundError("No type found with the provided criteria.");
  }
  return type
};

exports.getTypeById = async (id) => {
  const type = await typeRepository.getTypeById(id);
  if (!type) {
    throw new NotFoundError("Type is Not Found!");
  }
  return type;
};

exports.createType = async (data) => {
  return typeRepository.createType(data);
};

exports.updateType = async (id, data) => {
  const existingType = await typeRepository.getTypeById(id);
  if (!existingType) {
    throw new NotFoundError("Type is Not Found!");
  }

  data = {
    ...existingType,
    ...data,
  };

  const updatedType = await typeRepository.updateType(id, data);
  if (!updatedType) {
    throw new InternalServerError(["Failed to update type!"]);
  }

  return updatedType;
};

exports.deleteTypeById = async (id) => {
  const existingType = await typeRepository.getTypeById(id);
  if (!existingType) {
    throw new NotFoundError("Type is Not Found!");
  }

  const deletedType = await typeRepository.deleteTypeById(id);
  if (!deletedType) {
    throw new InternalServerError(["Failed to delete type!"]);
  }

  return deletedType;
};
