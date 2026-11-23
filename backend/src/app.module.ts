import { Module } from '@nestjs/common';
import { NumbersModule } from './modules/numbers/numbers.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { NumerologyModule } from './modules/numerology/numerology.module';
import { EnquiryModule } from './modules/enquiry/enquiry.module';

@Module({
  imports: [
    NumbersModule,
    CategoriesModule,
    NumerologyModule,
    EnquiryModule,
  ],
})
export class AppModule {}
