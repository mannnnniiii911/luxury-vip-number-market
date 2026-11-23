import { Controller, Get, Param, Query, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { NumbersService } from './numbers.service';
import { QueryNumbersDto } from './dto/query-numbers.dto';
import { VipNumber, PaginatedResult } from '@luxury-vip/shared-types';

@ApiTags('Numbers')
@Controller('api/v1/numbers')
export class NumbersController {
  constructor(private readonly numbersService: NumbersService) {}

  @Get()
  @ApiOperation({ summary: 'Query VIP numbers with filtering, sorting, and pagination' })
  @ApiResponse({ status: 200, description: 'Filtered list of VIP numbers' })
  query(@Query() dto: QueryNumbersDto): PaginatedResult<VipNumber> {
    return this.numbersService.query(dto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a single VIP number by ID' })
  @ApiResponse({ status: 200, description: 'VIP number details' })
  @ApiResponse({ status: 404, description: 'Number not found' })
  getById(@Param('id', ParseIntPipe) id: number): VipNumber {
    return this.numbersService.getById(id);
  }
}
