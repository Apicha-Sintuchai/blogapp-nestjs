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

    return { token };
  }

  async login(Signin: any): Promise<any> {
    const { username, password } = Signin;

    const user = await this.AuthModel.findOne({ username });
    if (!user) {
      throw new UnauthorizedException('username is not found');
    }

    const ismatch = await bcrypt.compare(password, user.password);

    if (!ismatch) {
      throw new UnauthorizedException('password is not found');
    }

    const token = this.jwtService.sign({ id: user._id });

    return { token };
  }
}
