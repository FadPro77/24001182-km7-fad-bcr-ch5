const transmissionRepository = require("../repositories/transmissionsRepository"); // Pastikan path ini sesuai dengan lokasi repository
const { imageUpload } = require("../utils/image-kit");

const { NotFoundError, InternalServerError } = require("../utils/request");

exports.getTransmissions = async (transmission_name) => {
  const transmissions = await transmissionRepository.getTransmissions(
    transmission_name
  );
  if (!transmissions.length) {
    throw new NotFoundError("No trasnmissions found with the provided criteria.");
  }
  return transmissions;
};
exports.getTransmissionById = async (id) => {
  const transmission = await transmissionRepository.getTransmissionById(id);

  if (!transmission) {
    throw new NotFoundError("Transmission is Not Found!");
  }

  return transmission;
};

exports.createTransmission = async (data) => {
  return transmissionRepository.createTransmission(data);
};

exports.updateTransmission = async (id, data) => {
  const existingTransmission = await transmissionRepository.getTransmissionById(
    id
  );
  if (!existingTransmission) {
    throw new NotFoundError("Transmission is Not Found!");
  }

  data = {
    ...existingTransmission,
    ...data,
  };

  const updatedTransmission = await transmissionRepository.updateTransmission(
    id,
    data
  );
  if (!updatedTransmission) {
    throw new InternalServerError(["Failed to update transmission!"]);
  }

  return updatedTransmission;
};

exports.deleteTransmissionById = async (id) => {
  const existingTransmission = await transmissionRepository.getTransmissionById(
    id
  );
  if (!existingTransmission) {
    throw new NotFoundError("Transmission is Not Found!");
  }

  const deletedTransmission =
    await transmissionRepository.deleteTransmissionById(id);
  if (!deletedTransmission) {
    throw new InternalServerError(["Failed to delete transmission!"]);
  }

  return deletedTransmission;
};
