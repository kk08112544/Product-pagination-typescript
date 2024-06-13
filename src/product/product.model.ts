import { Prisma } from "@prisma/client";

export class Product implements Prisma.ProductCreateInput {
    id: number
    pro_name: string;
    img_url: string;
    description: string;
    price: number;
}