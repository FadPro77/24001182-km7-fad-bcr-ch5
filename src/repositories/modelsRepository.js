const { PrismaClient } = require("@prisma/client");
const JSONBigInt = require("json-bigint");
const { NotFoundError } = require("../utils/request");

const prisma = new PrismaClient();

exports.getModels = async (
  model,
  capacity,
  transmission_name,
  type_name,
  manufacture_name,
  spec_name,
  option_name
) => {
  let query = {
    include: {
      Transmission: true,
      Manufacture: true,
      Type: true,
      modelSpecs: { include: { Specs: true } },
      modelOptions: { include: { Options: true } },
    },
  };

  let orQuery = [];
  if (model) {
    orQuery.push({
      model_name: { contains: model, mode: "insensitive" },
    });
  }
  if (capacity) {
    orQuery.push({
      capacity: parseInt(capacity, 10),
    });
  }
  if (transmission_name) {
    orQuery.push({
      Transmission: {
        transmission_name: { contains: transmission_name, mode: "insensitive" },
      },
    });
  }
  if (type_name) {
    orQuery.push({
      Type: {
        type_name: { contains: type_name, mode: "insensitive" },
      },
    });
  }
  if (manufacture_name) {
    orQuery.push({
      Manufacture: {
        manufacture_name: { contains: manufacture_name, mode: "insensitive" },
      },
    });
  }
  if (spec_name) {
    orQuery.push({
      modelSpecs: {
        some: {
          Specs: {
            spec_name: { contains: spec_name, mode: "insensitive" },
          },
        },
      },
    });
  }
  if (option_name) {
    orQuery.push({
      modelOptions: {
        some: {
          Options: {
            option_name: { contains: option_name, mode: "insensitive" },
          },
        },
      },
    });
  }
  if (orQuery.length > 0) {
    query.where = {
      ...query.where,
      OR: orQuery,
    };
  }
  const searchedModels = await prisma.models.findMany(query);

  if (searchedModels.length === 0) {
    throw new NotFoundError("Model not found");
  }

  const serializedModels = JSONBigInt.stringify(searchedModels);
  return JSONBigInt.parse(serializedModels);
};

exports.getModelById = async (id) => {
  const modelId = parseInt(id, 10);
  const model = await prisma.Models.findFirst({
    where: {
      id: modelId,
    },
    include: {
      Transmission: true,
      Manufacture: true,
      Type: true,
      modelSpecs: { include: { Specs: true } },
      modelOptions: { include: { Options: true } },
    },
  });

  const serializedModels = JSONBigInt.stringify(model);
  return JSONBigInt.parse(serializedModels);
};

exports.createModel = async (data) => {
  const newModel = await prisma.models.create({
    data: {
      model_name: data.model_name,
      transmission_id: parseInt(data.transmission_id, 10),
      capacity: parseInt(data.capacity, 10),
      type_id: parseInt(data.type_id, 10),
      manufacture_id: parseInt(data.manufacture_id, 10),
    },
    include: {
      Transmission: true,
      Manufacture: true,
      Type: true,
      modelSpecs: { include: { Specs: true } },
      modelOptions: { include: { Options: true } },
    },
  });

  const createNewOptions = await Promise.all(
    (Array.isArray(data.option_id)
      ? data.option_id
      : data.option_id.split(",").map((id) => id.trim())
    ).map(async (optionId) => {
      return prisma.modelOptions.create({
        data: {
          model_id: newModel.id,
          option_id: BigInt(optionId),
        },
      });
    })
  );

  const createNewSpecs = await Promise.all(
    (Array.isArray(data.spec_id)
      ? data.spec_id
      : data.spec_id.split(",").map((id) => id.trim())
    ).map(async (specId) => {
      return prisma.modelSpecs.create({
        data: {
          model_id: newModel.id,
          spec_id: BigInt(specId),
        },
      });
    })
  );

  const Models = {
    ...newModel,
    options: createNewOptions,
    specs: createNewSpecs,
  };

  const serializedNewModels = JSONBigInt.stringify(Models);
  return JSONBigInt.parse(serializedNewModels);
};

exports.updateModel = async (id, data) => {
  const updatedModel = await prisma.models.update({
    where: {
      id: parseInt(id, 10),
    },
    data: {
      model_name: data.model_name,
      transmission_id: parseInt(data.transmission_id, 10),
      capacity: parseInt(data.capacity, 10),
      type_id: parseInt(data.type_id, 10),
      manufacture_id: parseInt(data.manufacture_id, 10),
    },
    include: {
      Transmission: true,
      Manufacture: true,
      Type: true,
      modelSpecs: { include: { Specs: true } },
      modelOptions: { include: { Options: true } },
    },
  });

  const updateOptions = await Promise.all(
    (Array.isArray(data.option_id)
      ? data.option_id
      : data.option_id.split(",").map((id) => id.trim())
    ).map(async (optionId) => {
      return prisma.modelOptions.upsert({
        where: {
          model_id_option_id: {
            model_id: updatedModel.id,
            option_id: BigInt(optionId),
          },
        },
        update: {},
        create: {
          model_id: updatedModel.id,
          option_id: BigInt(optionId),
        },
      });
    })
  );

  const updateSpecs = await Promise.all(
    (Array.isArray(data.spec_id)
      ? data.spec_id
      : data.spec_id.split(",").map((id) => id.trim())
    ).map(async (specId) => {
      return prisma.modelSpecs.upsert({
        where: {
          model_id_spec_id: {
            model_id: updatedModel.id,
            spec_id: BigInt(specId),
          },
        },
        update: {},
        create: {
          model_id: updatedModel.id,
          spec_id: BigInt(specId),
        },
      });
    })
  );

  const Models = {
    ...updatedModel,
    options: updateOptions,
    specs: updateSpecs,
  };

  const serializedUpdatedModel = JSONBigInt.stringify(Models);
  return JSONBigInt.parse(serializedUpdatedModel);
};

exports.deleteModelById = async (modelId) => {
  await prisma.modelOptions.deleteMany({
    where: {
      model_id: parseInt(modelId, 10),
    },
  });

  await prisma.modelSpecs.deleteMany({
    where: {
      model_id: parseInt(modelId, 10),
    },
  });

  const deletedModel = await prisma.models.delete({
    where: {
      id: parseInt(modelId, 10),
    },
  });

  return deletedModel;
};
