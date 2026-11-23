import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiProperty } from '@nestjs/swagger';
import { IsInt, Min, Max, IsString } from 'class-validator';
import { NumerologyService } from './numerology.service';
import { NumerologyResult } from '@luxury-vip/shared-types';

export class NumerologyMatchDto {
  @ApiProperty({ example: 1, description: 'Day of birth (1-9 astrologically reduced)' })
  @IsInt()
  @Min(1)
  @Max(9)
  birthDay: number;

  @ApiProperty({ example: 'any', description: 'Target sum or "any"' })
  @IsString()
  targetSum: string;
}

@ApiTags('Numerology')
@Controller('api/v1/numerology')
export class NumerologyController {
  constructor(private readonly numerologyService: NumerologyService) {}

  @Post('match')
  @ApiOperation({ summary: 'Calculate matching VIP numbers for a birth day and target sum' })
  match(@Body() body: NumerologyMatchDto): NumerologyResult {
    return this.numerologyService.match(body.birthDay, body.targetSum);
  }
}
