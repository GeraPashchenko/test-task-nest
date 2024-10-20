import { Module } from '@nestjs/common';
import { ResidentService } from './resident.service';
import { ResidentController } from './resident.controller';
import { ResidentRepository } from './resident.repository';
import { DatabaseAbstractionModule } from 'src/database-abstraction/database-abstraction.module';
import { DBType } from 'src/database-abstraction/types/enums/database-type.enum';

@Module({
  imports: [DatabaseAbstractionModule.register(DBType.MONGODB)],
  controllers: [ResidentController],
  providers: [ResidentService, ResidentRepository],
  exports: [ResidentService],
})
export class ResidentModule {}
