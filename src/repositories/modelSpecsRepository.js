const { PrismaClient } = require("@prisma/client");
const JSONBigInt = require("json-bigint");
const prisma = new PrismaClient();

exports.getModelSpecs = async () => {
  let query = {};

  let orQuery = [];

  if (orQuery.length > 0) {
    query.where = {
      OR: orQuery,
    };
  }

  const searchedModelSpecs = await prisma.modelSpecs.findMany(query);

  const serializedModelSpecss = JSONBigInt.stringify(searchedModelSpecs);
  return JSONBigInt.parse(serializedModelSpecss);
};

exports.getModelSpecsById = async (id) => {
  const ModelSpecs = await prisma.modelSpecs.findUnique({
    where: {
      id: Number(id),
    },
    include: {
      Models: true,
      specs: { include: { spec: true } },
    },
  });

  const serializedModelSpecs = JSONBigInt.stringify(ModelSpecs);
  return JSONBigInt.parse(serializedModelSpecs);
};

exports.createModelSpecs = async (data) => {
  const newModelSpecs = await prisma.modelSpecs.create({
    data,
    include: {
      Models: true,
      specs: { include: { spec: true } },
    },
  });

  const serializedModelSpecs = JSONBigInt.stringify(newModelSpecs);
  return JSONBigInt.parse(serializedModelSpecs);
};

exports.updateModelSpecs = async (id, data) => {
  const updatedModelSpecs = await prisma.modelSpecs.update({
    where: {
      id: Number(id),
    },
    include: {
      Models: true,
      specs: { include: { spec: true } },
    },
    data,
  });

  const serializedModelSpecs = JSONBigInt.stringify(updatedModelSpecs);
  return JSONBigInt.parse(serializedModelSpecs);
};

exports.deleteModelSpecsById = async (id) => {
  const deletedModelSpecs = await prisma.modelSpecs.delete({
    where: {
      id: Number(id),
    },
    include: {
      Models: true,
      specs: { include: { spec: true } },
    },
  });

  const serializedModelSpecs = JSONBigInt.stringify(deletedModelSpecs);
  return JSONBigInt.parse(serializedModelSpecs);
};
