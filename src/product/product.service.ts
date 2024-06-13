import { PrismaService } from "src/prisma.service";
import { Injectable } from "@nestjs/common";
import * as fs from 'fs';
import * as path from 'path';
import { Product, Prisma } from "@prisma/client";



@Injectable()
export class ProductService {

    constructor(private prisma: PrismaService) {}

    async getAllProduct(): Promise<any[]> { 
        return this.prisma.product.findMany({
        });
    }
    

    async getProduct(id: number): Promise<any> { 
        return this.prisma.product.findUnique({
            where: { id: Number(id) },
           
        });
    }


    async createProduct(data: Product): Promise<Product>{
        
        return this.prisma.product.create({
            data,
          });
    }

    
    

    async updateProduct(id: number, data: Prisma.ProductUpdateInput): Promise<Product> {
        const getDvd = await this.prisma.product.findUnique({ where: { id: Number(id) } });
        if (data.img_url && getDvd?.img_url !== data.img_url) {
            const imagePath = path.join(__dirname, "../../assets/", getDvd.img_url);
            fs.unlink(imagePath, (err) => {
                if (err) {
                    console.error(`Failed to delete image at ${imagePath}:`, err);
                } else {
                    console.log(`Successfully deleted image at ${imagePath}`);
                }
            });
        }

        return this.prisma.product.update({
            where: { id: Number(id) },
            data: {
                pro_name: data.pro_name,
                img_url: data.img_url,
                description: data.description,
                price: data.price,
            },
        });
    }
   

    async deleteProduct(id: number): Promise<Product> {
        const getDvd = await this.prisma.product.findUnique({ where: { id: Number(id) } });
        if (getDvd?.img_url) {
            const imagePath = path.join(__dirname, "../../assets/", getDvd.img_url);
            fs.unlink(imagePath, (err) => {
                if (err) {
                    console.error(`Failed to delete image at ${imagePath}:`, err);
                } else {
                    console.log(`Successfully deleted image at ${imagePath}`);
                }
            });
        }
        return this.prisma.product.delete({
            where: { id: Number(id) },
        });
    }
}