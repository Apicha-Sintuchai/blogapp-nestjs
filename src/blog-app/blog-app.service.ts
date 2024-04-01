/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import * as fs from 'fs';
import { BlogSchema } from 'src/Schema/BlogSchema';
import { Model } from 'mongoose';
import { Auth } from 'src/Schema/AuthSchema';

@Injectable()
export class BlogAppService {
  constructor(
    @InjectModel(BlogSchema.name) private ModelBlog: Model<BlogSchema>,
    @InjectModel(Auth.name) private ModelAuth: Model<Auth>,
  ) {}

  async findAll(): Promise<BlogSchema[]> {
    return this.ModelBlog.find().sort({ title: -1 });
  }
  async create({ ...Data }): Promise<BlogSchema> {
    const filename = Data.file.filename;
    const createdBlog = new this.ModelBlog({
      title: Data.req.title,
      description: Data.req.description,
      file: filename,
      comment: Data.req.comment,
    });
    return createdBlog.save();
  }
  async deleteone(id: any): Promise<any> {
    const schemaid = await this.ModelAuth.findOneAndUpdate(
      { BlogID: id },
      { $pull: { BlogID: id } },
    );
    const deleteonebyid = await this.ModelBlog.findOneAndDelete({ _id: id });
    if (deleteonebyid?.file) {
      await fs.unlink('Picsave/' + deleteonebyid.file, (err) => {
        if (err) {
          console.log(err);
        }
      });
    }
    return { deleteonebyid, schemaid };
  }


  async seeusermame(): Promise<any> {
    return await this.ModelAuth.find()

      .select('-password')
      .populate({
        path:'BlogID',
      })
  .sort({'BlogID.title': -1})
  .exec();  
  }

  async findoneuser(id: string): Promise<BlogSchema> {
    return this.ModelAuth.findById(id).select('-password').populate('BlogID');
  }
  async testtoken({ id }){
    return this.ModelAuth.findById(id).select('-password').populate('BlogID');
  }
  async letnamelater({ ...Data }): Promise<any> {
    
    const filename = Data.file.filename;
    const passdata = {
      title: Data.req.title,
      description: Data.req.description,
      file: filename,
    };
    const savepost = await new this.ModelBlog(passdata);
    savepost.save();
    const refupdate = await this.ModelAuth.findOneAndUpdate(
      { _id: Data.iduser },
      { $push: { BlogID: savepost._id } },
    );
    return refupdate;
  }

  async increaselink(id: string): Promise<BlogSchema> {
    const increase = await this.ModelBlog.findOneAndUpdate(
      { _id: id },
      { $inc: { like: 1 } },
    );
    return increase;
  }
  async decreaselink(id: string): Promise<BlogSchema> {
    const increase = await this.ModelBlog.findOneAndUpdate(
      { _id: id },
      { $inc: { like: -1 } },
    );
    return increase;
  }
}
