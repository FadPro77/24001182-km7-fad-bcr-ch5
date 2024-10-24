const { PrismaClient } = require("@prisma/client");
const JSONBigInt = require("json-bigint");
const prisma = new PrismaClient();

exports.getTypes = async (type_name) => {
  let query = {};

  let orQuery = [];

  if (type_name) {
    orQuery.push({
      type_name: { contains: type_name, mode: "insensitive" },
    });
  }

  if (orQuery.length > 0) {
    query.where = {
      OR: orQuery,
    };
  }

  const searchedTypes = await prisma.type.findMany(query);

  const serializedTypes = JSONBigInt.stringify(searchedTypes);
  return JSONBigInt.parse(serializedTypes);
};

exports.createType = async (data) => {
  const newType = await prisma.type.create({
    data,
  });

  const serializedType = JSONBigInt.stringify(newType);
  return JSONBigInt.parse(serializedType);
};

exports.getTypeById = async (id) => {
  const type = await prisma.type.findUnique({
    where: {
      id: Number(id),
    },
  });

  const serializedType = JSONBigInt.stringify(type);
  return JSONBigInt.parse(serializedType);
};

exports.updateType = async (id, data) => {
  const updatedType = await prisma.type.update({
    where: {
      id: Number(id),
    },
    data,
  });

  const serializedType = JSONBigInt.stringify(updatedType);
  return JSONBigInt.parse(serializedType);
};

exports.deleteTypeById = async (id) => {
  const deletedType = await prisma.type.delete({
    where: {
      id: Number(id),
    },
  });

  const serializedType = JSONBigInt.stringify(deletedType);
  return JSONBigInt.parse(serializedType);
};
