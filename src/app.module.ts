import { Module } from '@nestjs/common';
import { FileModule } from './file/file.module';
import { ProductModule } from './product/product.module';



@Module({
  imports: [
    FileModule,
    ProductModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
