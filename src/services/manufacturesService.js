const manufactureRepository = require("../repositories/manufacturesRepository");
const { imageUpload } = require("../utils/image-kit");

const {
  NotFoundError,
  InternalServerError,
  BadRequestError,
} = require("../utils/request");

exports.getManufactures = async (
  manufacture_name,
  manufacture_region,
  year_establish
) => {
  const manufactures = await manufactureRepository.getManufactures(
    manufacture_name,
    manufacture_region,
    year_establish
  );
  if (!manufactures.length) {
    throw new NotFoundError(
      "No manufactures found with the provided criteria."
    );
  }
  return manufactures;
};

exports.createManufacture = async (data) => {
  return manufactureRepository.createManufacture(data);
};

exports.getManufactureById = async (id) => {
  const manufacture = await manufactureRepository.getManufactureById(id);

  if (!manufacture) {
    throw new NotFoundError("Manufacture is Not Found!");
  }

  return manufacture;
};

exports.updateManufacture = async (id, data) => {
  const existingManufacture = await manufactureRepository.getManufactureById(
    id
  );
  if (!existingManufacture) {
    throw new NotFoundError("Manufacture is Not Found!");
  }

  data = {
    ...existingManufacture,
    ...data,
  };

  const updatedManufacture = await manufactureRepository.updateManufacture(
    id,
    data
  );
  if (!updatedManufacture) {
    throw new InternalServerError(["Failed to update manufacture!"]);
  }

  return updatedManufacture;
};

exports.deleteManufactureById = async (id) => {
  const existingManufacture = await manufactureRepository.getManufactureById(
    id
  );

  if (!existingManufacture) {
    throw new NotFoundError("Manufacture is Not Found!");
  }

  const deletedManufacture = await manufactureRepository.deleteManufactureById(
    id
  );

  if (!deletedManufacture) {
    throw new InternalServerError(["Failed to delete manufacture!"]);
  }

  return deletedManufacture;
};
