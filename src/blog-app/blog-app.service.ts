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
    return this.ModelBlog.find().sort({ 'Data.HearderPost': 1 });
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
  async deleteone(id: any): Promise<BlogSchema> {
    const deleteonebyid = await this.ModelBlog.findOneAndDelete({ _id: id });
    if (deleteonebyid?.file) {
      await fs.unlink('BlogPicture/' + deleteonebyid.file, (err) => {
        if (err) {
          console.log(err);
        }
      });
    }
    return deleteonebyid;
  }

  async putonenest(id: string, Data): Promise<BlogSchema> {
    console.log(Data);
    const putonee = await this.ModelBlog.findOneAndUpdate(
      { 'Data.Datacomement._id': id },
      { $set: { 'Data.Datacomement.$': Data } },
    );

    return putonee;
  }
  async deleteNest(id: string, idnest: string): Promise<BlogSchema> {
    const updatedBlog = await this.ModelBlog.findOneAndUpdate(
      { _id: id },
      { $pull: { 'Data.Datacomement': { _id: idnest } } },
      { new: true },
    );

    return updatedBlog;
  }

  async postcomment(id: string, commentdata): Promise<BlogSchema> {
    const postcomment = await this.ModelBlog.findByIdAndUpdate(
      { _id: id },
      { $push: { 'Data.Datacomement': commentdata } },
    );
    return postcomment;
  }
  async seeusermame(): Promise<any> {
    return this.ModelAuth.find();
  }

  async findoneuser(id: string): Promise<BlogSchema> {
    return this.ModelAuth.findById(id);
  }

  async pushuserblog({ ...Data }): Promise<any> {
    const filename = Data.file.filename;
    const id = Data.id;
    const namelater = {
      title: Data.req.title,
      description: Data.req.description,
      file: filename,
      comment: Data.req.comment,
    };
    const push = await this.ModelAuth.findOneAndUpdate(
      { _id: id },
      { $push: { Blog: namelater } },
    );
    return push;
  }

  async deleteuserblog(id: string, idblog: string): Promise<any> {
    const deleteblog = await this.ModelAuth.findByIdAndDelete(
      { _id: id },
      { $pull: { Blog: { _id: idblog } } },
    );
    return deleteblog;
  }
}
