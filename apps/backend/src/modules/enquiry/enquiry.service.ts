import { Injectable } from '@nestjs/common';
import { CreateEnquiryDto } from './dto/create-enquiry.dto';

@Injectable()
export class EnquiryService {
  private readonly whatsappNumber = '916290969079';

  processEnquiry(dto: CreateEnquiryDto) {
    const text = encodeURIComponent(
      `Hello VIP Numbers, my name is ${dto.name}. I am enquiring about VIP Mobile Number: ${dto.number} (Phone: ${dto.phone}${dto.notes ? ', Note: ' + dto.notes : ''}). Please share the details.`
    );
    const whatsappUrl = `https://wa.me/${this.whatsappNumber}?text=${text}`;

    return {
      success: true,
      message: 'Enquiry received! VIP Director will connect within 15 minutes.',
      whatsappUrl,
      enquiry: {
        ...dto,
        createdAt: new Date().toISOString(),
      },
    };
  }
}
