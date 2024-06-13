-- CreateTable
CREATE TABLE "Product" (
    "id" SERIAL NOT NULL,
    "pro_name" TEXT NOT NULL,
    "img_url" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);
