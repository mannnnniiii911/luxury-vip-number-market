import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CategoriesService } from './categories.service';
import { CategorySummary } from '@luxury-vip/shared-types';

@ApiTags('Categories')
@Controller('api/v1/categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  @ApiOperation({ summary: 'Get all pattern categories with live count' })
  @ApiResponse({ status: 200, description: 'List of categories with counts' })
  getAll(): CategorySummary[] {
    return this.categoriesService.getCategories();
  }
}
