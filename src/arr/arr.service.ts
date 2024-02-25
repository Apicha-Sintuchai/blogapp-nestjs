import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { somethinglike } from 'src/Schema/TestSchema';

@Injectable()
export class ArrService {
  constructor(
    // Inject the somethinglike model
    @InjectModel(somethinglike.name)
    private somethinglikeModel: Model<somethinglike>,
  ) {}

  async findAll(): Promise<somethinglike[]> {
    return await this.somethinglikeModel.find();
  }

  async create(createSomethinglike: any): Promise<somethinglike> {
    console.log(createSomethinglike);
    const { name, age, address } = createSomethinglike;
    const todata = await this.somethinglikeModel.create({
      name,
      age,
      address,
    });
    return todata;
  }
}
