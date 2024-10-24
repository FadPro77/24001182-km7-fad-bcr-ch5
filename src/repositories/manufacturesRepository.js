const { PrismaClient } = require("@prisma/client");
const JSONBigInt = require("json-bigint");
const prisma = new PrismaClient();

exports.getManufactures = async (
  manufacture_name,
  manufacture_region,
  year_establish
) => {
  let query = {};

  let orQuery = [];

  if (manufacture_name) {
    orQuery.push({
      manufacture_name: { contains: manufacture_name, mode: "insensitive" },
    });
  }
  if (manufacture_region) {
    orQuery.push({
      manufacture_region: { contains: manufacture_region, mode: "insensitive" },
    });
  }
  if (year_establish) {
    orQuery.push({
      year_establish: { equals: year_establish },
    });
  }

  if (orQuery.length > 0) {
    query.where = {
      OR: orQuery,
    };
  }

  const searchedManufactures = await prisma.manufacture.findMany(query);
  const serializedManufactures = JSONBigInt.stringify(searchedManufactures);
  return JSONBigInt.parse(serializedManufactures);
};

exports.getManufactureById = async (id) => {
  const manufacture = await prisma.manufacture.findUnique({
    where: { id: Number(id) },
  });

  const serializedManufacture = JSONBigInt.stringify(manufacture);
  return JSONBigInt.parse(serializedManufacture);
};

exports.createManufacture = async (data) => {
  const newManufacture = await prisma.manufacture.create({
    data,
  });

  const serializedManufactures = JSONBigInt.stringify(newManufacture);
  return JSONBigInt.parse(serializedManufactures);
};

exports.updateManufacture = async (id, data) => {
  const updatedManufacture = await prisma.manufacture.update({
    where: {
      id: Number(id),
    },
    data,
  });

  const serializedManufactures = JSONBigInt.stringify(updatedManufacture);
  return JSONBigInt.parse(serializedManufactures);
};

exports.deleteManufactureById = async (id) => {
  const deletedManufacture = await prisma.manufacture.delete({
    where: {
      id: Number(id),
    },
  });

  const serializedManufacture = JSONBigInt.stringify(deletedManufacture);
  return JSONBigInt.parse(serializedManufacture);
};
