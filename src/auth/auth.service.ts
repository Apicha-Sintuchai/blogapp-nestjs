/* eslint-disable prettier/prettier */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { Auth } from 'src/Schema/AuthSchema';
@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Auth.name)
    private AuthModel: Model<Auth>,
    private jwtService: JwtService,
  ) {}

  async SignUp(SignUp: any): Promise<any> {

    const { username, password, post } = SignUp;

    const hastpassword = await bcrypt.hash(password, 10);

    const ishaveready = await this.AuthModel.findOne({ username });

    if (ishaveready) {
      return 'username is ready';
    }
    const user = await this.AuthModel.create({
      username,
      password: hastpassword,
      post,
    });
     
    const token = this.jwtService.sign({ id: user._id });

    return { username,password };
  }

  async login(Signin: any): Promise<any> {
    const { username, password } = Signin;

    
    const user = await this.AuthModel.findOne({ username });

    if (!user) {
      return new UnauthorizedException('Your username is not correct',{description:'Your username is not correct'});
    }

    const ismatch = await bcrypt.compare(password, user.password);

    if (!ismatch) {
      return new UnauthorizedException('Your password is not correct',{description:'Your password is not correct'});
    }
    const _id = user._id;
    const token = this.jwtService.sign({ id: user._id });
    
    return { "token":token,"userid":_id };
  }

}
