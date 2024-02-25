import { Module } from '@nestjs/common';
import { ArrController } from './arr.controller';
import { ArrService } from './arr.service';
import { MongooseModule } from '@nestjs/mongoose';
import { NestedSchema, somethinglike } from 'src/Schema/TestSchema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: somethinglike.name,
        schema: NestedSchema,
      },
    ]),
  ],
  controllers: [ArrController],
  providers: [ArrService],
})
export class ArrModule {}
