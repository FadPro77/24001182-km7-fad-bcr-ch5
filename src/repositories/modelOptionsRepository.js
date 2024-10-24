const { PrismaClient } = require("@prisma/client");
const JSONBigInt = require("json-bigint");
const prisma = new PrismaClient();

exports.getModelOptions = async () => {
  let query = {};

  let orQuery = [];


  if (orQuery.length > 0) {
    query.where = {
      OR: orQuery,
    };
  }

  const searchedModelOptions = await prisma.modelOptions.findMany(query);

  const serializedOptions = JSONBigInt.stringify(searchedModelOptions);
  return JSONBigInt.parse(serializedOptions);
};

exports.getModelOptionsById = async (id) => {
  const modelOptions = await prisma.modelOptions.findUnique({
    where: {
      id: Number(id),
    },
  });

  const serializedOption = JSONBigInt.stringify(modelOptions);
  return JSONBigInt.parse(serializedOption);
};

exports.createModelOptions = async (data) => {
  const newOption = await prisma.modelOptions.create({
    data,
  });

  const serializedOption = JSONBigInt.stringify(newOption);
  return JSONBigInt.parse(serializedOption);
};

exports.updateModelOptions = async (id, data) => {
  const updatedmodelOptions = await prisma.modelOptions.update({
    where: {
      id: Number(id),
    },
    data,
  });

  const serializedOption = JSONBigInt.stringify(updatedmodelOptions);
  return JSONBigInt.parse(serializedOption);
};

exports.deleteModelOptionsById = async (id) => {
  const deletedModelOptions = await prisma.modelOptions.delete({
    where: {
      id: Number(id),
    },
  });

  const serializedOption = JSONBigInt.stringify(deletedModelOptions);
  return JSONBigInt.parse(serializedOption);
};
