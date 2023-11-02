import { Module } from '@nestjs/common';
import { ResidentService } from './resident.service';
import { ResidentController } from './resident.controller';
import { DatabaseModule } from 'src/database/database.module';
import { ResidentRepository } from './resident.repository';

@Module({
  imports: [DatabaseModule],
  controllers: [ResidentController],
  providers: [ResidentService, ResidentRepository],
  exports: [ResidentService],
})
export class ResidentModule {}
