const { PrismaClient } = require("@prisma/client");
const JSONBigInt = require("json-bigint");
const prisma = new PrismaClient();

exports.getAvailable = async (available_status) => {
  let query = {};

  if (available_status) {
    query.where = {
      available_status: { contains: available_status, mode: "insensitive" },
    };
  }

  const searchedAvailable = await prisma.available.findMany(query);
  const serializedAvailable = JSONBigInt.stringify(searchedAvailable);

  return JSONBigInt.parse(serializedAvailable);
};

exports.createAvailable = async (data) => {
  const newAvailable = await prisma.available.create({
    data,
  });

  const serializedAvailable = JSONBigInt.stringify(newAvailable);
  return JSONBigInt.parse(serializedAvailable);
};

exports.getAvailableById = async (id) => {
  const available = await prisma.available.findUnique({
    where: {
      id: Number(id),
    },
  });

  const serializedAvailable = JSONBigInt.stringify(available);
  return JSONBigInt.parse(serializedAvailable);
};

exports.updateAvailable = async (id, data) => {
  const updatedAvailable = await prisma.available.update({
    where: {
      id: Number(id),
    },
    data,
  });

  const serializedAvailable = JSONBigInt.stringify(updatedAvailable);
  return JSONBigInt.parse(serializedAvailable);
};

exports.deleteAvailableById = async (id) => {
  const deletedAvailable = await prisma.available.delete({
    where: {
      id: Number(id),
    },
  });

  const serializedAvailable = JSONBigInt.stringify(deletedAvailable);
  return JSONBigInt.parse(serializedAvailable);
};
