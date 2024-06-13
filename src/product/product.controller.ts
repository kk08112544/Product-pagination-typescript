import { ProductService } from "./product.service";
import { Response } from 'express';
import { Product } from "./product.model";
import { Get, Body, Post, Param, Delete, Put, Controller, Res, UseGuards } from "@nestjs/common";


@Controller('api/product')
export class ProductController{

    constructor(private readonly productService: ProductService){}

    @Get()
    async getAllProduct(@Res() res: Response): Promise<any> {
        try {
            const Product = await this.productService.getAllProduct();
            return res.status(201).json(Product);
        } catch (error) {
            return res.status(500).json({ error: 'Error message' });
        }
    }

    @Post('/createNewProduct')
    async postProduct(@Body() postData: Product, @Res() res: Response): Promise<any> {
      
        if (!postData.pro_name || !postData.img_url || !postData.description || !postData.price) {
            return res.status(400).json({ error: 'Content is not empty' });
        }

        try {
            const data = await this.productService.createProduct(postData);
            res.status(201).json(data);
        } catch (error) {
            res.status(500).json({ error: 'Error message' });
        }
    }

    @Get(':id')
    async getProduct(@Param('id') id:number, @Res() res: Response):Promise<any>{
        try {
            const product = await this.productService.getProduct(id);
            if (product) {
                res.status(201).json(product); 
            } else {
                res.status(400).json({ error: 'Product Id is not found' }); 
            }
        } catch (error) {
            res.status(500).json({ error: 'Error message' });
        }
    }

   @Delete('/deleteProduct/:id')
   async deleteProduct(@Param('id') id:number, @Res() res:Response): Promise<any>{
        try{
            const product = await this.productService.deleteProduct(id);
            if(product){
                res.status(201).json({message:'Delete Successfully'})
            }else{
                res.status(400).json({error:'Product ID not found'});
            }
        }catch(error){
            res.status(500).json({error:'Error message'});
        }
   }

    @Put('/updateProduct/:id')
    async updateProduct(@Param('id') id:number, @Body() postData:Product, @Res() res:Response):Promise<any>{
        if (!postData.pro_name && !postData.description && !postData.img_url && !postData.price) {
            return res.status(400).json({ error: 'Content is not empty' });
        } 
        try{
            const updatedProduct = await this.productService.updateProduct(id, postData);
            if (updatedProduct) {
                res.status(201).json(updatedProduct); // 201 status if update is successful
            } else {
                res.status(400).json({ error: 'Product Id is not found' }); // 400 status if book is not found
            }
        }catch(error){
            res.status(500).json({ error: 'Error message' });
        }
    }

 
}