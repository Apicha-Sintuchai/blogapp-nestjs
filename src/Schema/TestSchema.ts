/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

// create a schema for the address
@Schema()
export class Address {
  @Prop()
  city: string;

  @Prop()
  street: string;

  @Prop()
  zip: number;
}

// create a schema for the data
@Schema()
export class somethinglike {
  @Prop()
  name: string;

  @Prop()
  age: number;

  @Prop([Address])
  address: Address[];
}

export const NestedSchema = SchemaFactory.createForClass(somethinglike)