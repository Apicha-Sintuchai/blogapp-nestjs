/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
export type DataDocument = HydratedDocument<BlogSchema>;
@Schema()
export class BlogSchema {

    @Prop(raw({
        HearderPost:{
            type:String,
           
        },
        HearderTitle:{
            type:String,
            
        },
        file:{
            type:String,
        },
        Datacomement:
        [
            {
                usercomment:
                {
                    type:String
                }
            }
        ]



    }))
    Data:Record<string,any>
}

export const BlogAppSchema = SchemaFactory.createForClass(BlogSchema)
