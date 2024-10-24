const { PrismaClient } = require("@prisma/client");
const JSONBigInt = require("json-bigint");
const prisma = new PrismaClient();

exports.getTransmissions = async (transmission_name) => {
  let query = {};
  let orQuery = [];

  if (transmission_name) {
    orQuery.push({
      transmission_name: { contains: transmission_name, mode: "insensitive" },
    });
  }

  if (orQuery.length > 0) {
    query.where = {
      OR: orQuery,
    };
  }

  const searchedTransmissions = await prisma.transmission.findMany(query);
  const serializedTransmissions = JSONBigInt.stringify(searchedTransmissions);
  return JSONBigInt.parse(serializedTransmissions);
};

exports.createTransmission = async (data) => {
  const newTransmission = await prisma.transmission.create({
    data,
  });

  const serializedTransmission = JSONBigInt.stringify(newTransmission);
  return JSONBigInt.parse(serializedTransmission);
};

exports.getTransmissionById = async (id) => {
  const transmission = await prisma.transmission.findUnique({
    where: {
      id: Number(id),
    },
  });

  const serializedTransmission = JSONBigInt.stringify(transmission);
  return JSONBigInt.parse(serializedTransmission);
};

exports.updateTransmission = async (id, data) => {
  const updatedTransmission = await prisma.transmission.update({
    where: {
      id: Number(id),
    },
    data,
  });

  const serializedTransmission = JSONBigInt.stringify(updatedTransmission);
  return JSONBigInt.parse(serializedTransmission);
};

exports.deleteTransmissionById = async (id) => {
  const deletedTransmission = await prisma.transmission.delete({
    where: {
      id: Number(id),
    },
  });

  const serializedTransmission = JSONBigInt.stringify(deletedTransmission);
  return JSONBigInt.parse(serializedTransmission);
};
