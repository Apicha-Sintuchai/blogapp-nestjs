/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { BlogSchema } from './BlogSchema';

export type DataDocument = HydratedDocument<Auth>;
@Schema()
export class Auth {


  @Prop()
  username: string;

  @Prop()
  password: string;

  // @Prop([BlogSchema])
  // Blog:BlogSchema[]

  @Prop({type:[{type:mongoose.Schema.Types.ObjectId,ref:'BlogSchema'}]})
  BlogID:BlogSchema[]
}

export const AuthSchema = SchemaFactory.createForClass(Auth)

