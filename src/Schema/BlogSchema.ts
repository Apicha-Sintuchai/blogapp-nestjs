/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Auth } from './AuthSchema';
export type DataDocument = HydratedDocument<BlogSchema>;





@Schema()
export class BlogSchema {

    @Prop()
    title: string;
    
    @Prop()
    description: string;
    
    @Prop({default:'noimage'})
    file: string;

   @Prop({default:0})
    like: number;
    
    


}

export const BlogAppSchema = SchemaFactory.createForClass(BlogSchema)
