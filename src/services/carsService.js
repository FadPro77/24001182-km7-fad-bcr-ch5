const carsRepository = require("../repositories/carsRepository");
const { imageUpload, imageDelete } = require("../utils/image-kit");
const {
  NotFoundError,
  InternalServerError,
  BadRequestError,
} = require("../utils/request");

exports.getCars = async (
  model_name,
  manufacture_name,
  manufacture_region,
  year,
  plate,
  rentPerDay,
  capacity,
  transmission_name,
  type_name,
  available_status,
  available_At,
  option_name,
  spec_name
) => {
  const cars = await carsRepository.getCars(
    model_name,
    manufacture_name,
    manufacture_region,
    year,
    plate,
    rentPerDay,
    capacity,
    transmission_name,
    type_name,
    available_status,
    available_At,
    option_name,
    spec_name
  );
  if (!cars.length) {
    throw new NotFoundError("No cars found with the provided criteria.");
  }
  return cars;
};

exports.getCarById = async (id) => {
  const data = await carsRepository.getCarById(id);
  if (!data) {
    throw new NotFoundError("Car is Not Found!");
  }
  return data;
};

exports.createCar = async (data, file) => {
  if (file?.image) {
    data.image = await imageUpload(file.image);
  }
  return carsRepository.createCar(data);
};

exports.updateCarById = async (id, data, file) => {
  const existingCar = await carsRepository.getCarById(id);
  if (!existingCar) {
    throw new NotFoundError("Car is Not Found!");
  }

  data = {
    ...existingCar,
    ...data,
  };
  if (file?.image) {
    data.image = await imageUpload(file.image);
  }
  const updatedCar = await carsRepository.updateCarById(id, data);
  if (!updatedCar) {
    throw new InternalServerError(["Failed to update Car!"]);
  }
  return updatedCar;
};

exports.deleteCarById = async (id) => {
  const existingCar = await carsRepository.getCarById(id);
  if (!existingCar) {
    throw new NotFoundError("Car is Not Found!");
  }

  const deletedCar = await carsRepository.deleteCarById(id);
  if (!deletedCar) {
    throw new InternalServerError(["Failed to Delete Car!"]);
  }

  return deletedCar;
};
