import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as fs from 'fs';
import { BlogSchema } from 'src/Schema/BlogSchema';

@Injectable()
export class BlogAppService {
  constructor(
    @InjectModel(BlogSchema.name) private ModelBlog: Model<BlogSchema>,
  ) {}
  async findAll(): Promise<BlogSchema[]> {
    return this.ModelBlog.find().sort({ 'Data.HearderPost': -1 });
  }

  async create(Data: any, file: Express.Multer.File): Promise<BlogSchema> {
    const savaall = new this.ModelBlog({
      Data: {
        HearderPost: Data.HearderPost,
        HearderTitle: Data.HearderTitle,
        file: file.filename,
        Datacomement: Data.Datacomement,
      },
    });
    return savaall.save();
  }
  async deleteone(id: any): Promise<BlogSchema> {
    const deleteonebyid = await this.ModelBlog.findOneAndDelete({ _id: id });
    if (deleteonebyid?.Data.file) {
      await fs.unlink('BlogPicture/' + deleteonebyid.Data.file, (err) => {
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
      { new: true }, // This option returns the modified document
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
}
