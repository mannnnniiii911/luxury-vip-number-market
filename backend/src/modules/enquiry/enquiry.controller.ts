import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { EnquiryService } from './enquiry.service';
import { CreateEnquiryDto } from './dto/create-enquiry.dto';

@ApiTags('Enquiry')
@Controller('api/v1/enquiry')
export class EnquiryController {
  constructor(private readonly enquiryService: EnquiryService) {}

  @Post()
  @ApiOperation({ summary: 'Submit a VIP number enquiry and receive prefilled WhatsApp link' })
  @ApiResponse({ status: 201, description: 'Enquiry processed successfully' })
  create(@Body() dto: CreateEnquiryDto) {
    return this.enquiryService.processEnquiry(dto);
  }
}
