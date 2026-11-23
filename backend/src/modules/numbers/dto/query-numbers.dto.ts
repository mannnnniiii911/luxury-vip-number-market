import { IsOptional, IsString, IsIn, IsInt, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class QueryNumbersDto {
  @ApiPropertyOptional({ description: 'Pattern Category name (e.g. "AB AB", "786 Series", "All")' })
  @IsOptional()
  @IsString()
  category?: string = 'All';

  @ApiPropertyOptional({ description: 'Search term for digits, pattern, or sum' })
  @IsOptional()
  @IsString()
  search?: string = '';

  @ApiPropertyOptional({ enum: ['all', 'under10k', '10kto50k', '50kto200k', 'above200k'], default: 'all' })
  @IsOptional()
  @IsIn(['all', 'under10k', '10kto50k', '50kto200k', 'above200k'])
  price?: string = 'all';

  @ApiPropertyOptional({ enum: ['repeat-first', 'price-asc', 'price-desc', 'sum', 'default'], default: 'repeat-first' })
  @IsOptional()
  @IsIn(['repeat-first', 'price-asc', 'price-desc', 'sum', 'default'])
  sort?: string = 'repeat-first';

  @ApiPropertyOptional({ default: 1, minimum: 1 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  @ApiPropertyOptional({ default: 30, minimum: 1 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit?: number = 30;
}
