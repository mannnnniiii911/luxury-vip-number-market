import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class CreateEnquiryDto {
  @ApiProperty({ example: '97090 92929', description: 'VIP Mobile Number being inquired' })
  @IsNotEmpty()
  @IsString()
  number: string;

  @ApiProperty({ example: 'Vikramaditya Sharma', description: 'Customer Full Name' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: '9811122233', description: 'Customer WhatsApp or Mobile Phone' })
  @IsNotEmpty()
  @IsString()
  phone: string;

  @ApiPropertyOptional({ example: 'Delhi NCR / Looking to activate tomorrow', description: 'Porting circle or notes' })
  @IsOptional()
  @IsString()
  notes?: string;
}
