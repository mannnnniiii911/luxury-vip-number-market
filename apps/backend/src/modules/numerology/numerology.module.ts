import { Module } from '@nestjs/common';
import { NumerologyController } from './numerology.controller';
import { NumerologyService } from './numerology.service';
import { NumbersModule } from '../numbers/numbers.module';

@Module({
  imports: [NumbersModule],
  controllers: [NumerologyController],
  providers: [NumerologyService],
})
export class NumerologyModule {}
