import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFiles,
  UseGuards
} from '@nestjs/common'
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express'
import { JwtAuthGuard } from '../auth/decorators/auth.decorator'
import { RoleGuard } from '../auth/decorators/role.guard'


@UseGuards(JwtAuthGuard)
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @UseGuards(RoleGuard)
  @Post()
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'avatar', maxCount: 1 },
  ]))
  create(
    @UploadedFiles() files: { avatar?: Express.Multer.File[]},
    @Body() createProductDto: CreateProductDto) {
    const { avatar } = files
    return this.productService.create(createProductDto, avatar[0]);
  }
}
