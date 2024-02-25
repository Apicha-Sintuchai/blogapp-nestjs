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
    
    @Prop()
    file: string;

    @Prop({type:mongoose.Schema.Types.ObjectId,ref:'Auth'})
    AuthID:Auth
    
    


}

export const BlogAppSchema = SchemaFactory.createForClass(BlogSchema)
