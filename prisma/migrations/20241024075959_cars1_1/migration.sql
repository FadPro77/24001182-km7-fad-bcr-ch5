-- CreateTable
CREATE TABLE "Available" (
    "id" BIGSERIAL NOT NULL,
    "available_status" VARCHAR(100),

    CONSTRAINT "Available_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cars" (
    "id" BIGSERIAL NOT NULL,
    "plate" VARCHAR(25),
    "model_id" BIGINT,
    "rentPerDay" DOUBLE PRECISION,
    "description" VARCHAR(255),
    "availableAt" TIMESTAMP(6),
    "availability_id" BIGINT,
    "year" INTEGER,
    "image" VARCHAR(255),

    CONSTRAINT "Cars_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Manufacture" (
    "id" BIGSERIAL NOT NULL,
    "manufacture_name" VARCHAR(100),
    "manufacture_region" VARCHAR(100),
    "year_establish" INTEGER,

    CONSTRAINT "Manufacture_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Models" (
    "id" BIGSERIAL NOT NULL,
    "model_name" VARCHAR(100),
    "transmission_id" BIGINT,
    "capacity" INTEGER,
    "type_id" BIGINT,
    "manufacture_id" BIGINT,

    CONSTRAINT "Models_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Options" (
    "id" BIGSERIAL NOT NULL,
    "option_name" VARCHAR(100),

    CONSTRAINT "Options_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Specs" (
    "id" BIGSERIAL NOT NULL,
    "spec_name" VARCHAR(100),

    CONSTRAINT "Specs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Transmission" (
    "id" BIGSERIAL NOT NULL,
    "transmission_name" VARCHAR(100),

    CONSTRAINT "Transmission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Type" (
    "id" BIGSERIAL NOT NULL,
    "type_name" VARCHAR(100),

    CONSTRAINT "Type_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "modelOptions" (
    "model_id" BIGINT NOT NULL,
    "option_id" BIGINT NOT NULL,

    CONSTRAINT "modelOptions_pkey" PRIMARY KEY ("model_id","option_id")
);

-- CreateTable
CREATE TABLE "modelSpecs" (
    "model_id" BIGINT NOT NULL,
    "spec_id" BIGINT NOT NULL,

    CONSTRAINT "modelSpecs_pkey" PRIMARY KEY ("model_id","spec_id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" BIGSERIAL NOT NULL,
    "name" VARCHAR NOT NULL,
    "email" VARCHAR NOT NULL,
    "password" VARCHAR NOT NULL,
    "profile_picture" VARCHAR,
    "role_id" INTEGER NOT NULL DEFAULT 2,

    CONSTRAINT "users_pk" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_idx" ON "users"("email");

-- AddForeignKey
ALTER TABLE "Cars" ADD CONSTRAINT "Cars_availability_id_fkey" FOREIGN KEY ("availability_id") REFERENCES "Available"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Cars" ADD CONSTRAINT "Cars_model_id_fkey" FOREIGN KEY ("model_id") REFERENCES "Models"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Models" ADD CONSTRAINT "Models_manufacture_id_fkey" FOREIGN KEY ("manufacture_id") REFERENCES "Manufacture"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Models" ADD CONSTRAINT "Models_transmission_id_fkey" FOREIGN KEY ("transmission_id") REFERENCES "Transmission"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Models" ADD CONSTRAINT "Models_type_id_fkey" FOREIGN KEY ("type_id") REFERENCES "Type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "modelOptions" ADD CONSTRAINT "fk_model" FOREIGN KEY ("model_id") REFERENCES "Models"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "modelOptions" ADD CONSTRAINT "fk_option" FOREIGN KEY ("option_id") REFERENCES "Options"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "modelSpecs" ADD CONSTRAINT "fk_model_spec" FOREIGN KEY ("model_id") REFERENCES "Models"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "modelSpecs" ADD CONSTRAINT "fk_spec" FOREIGN KEY ("spec_id") REFERENCES "Specs"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
