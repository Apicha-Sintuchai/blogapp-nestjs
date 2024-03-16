/* eslint-disable prettier/prettier */
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ExtractJwt, Strategy } from 'passport-jwt';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';
import { Auth } from 'src/Schema/AuthSchema';
@Injectable()

export class JwtStrategy  extends PassportStrategy(Strategy){
    constructor(
        @InjectModel(Auth.name)
        private usermodel:Model<Auth>
    ){
        super({
            jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWT_SECRET
        });
    }


    async validate(payload){
        
        const {id} = payload;

        const user = await this.usermodel.findById(id)

        if(!user){
            throw new UnauthorizedException({description:'Your username is not correct'})
        }
        return user
    }
}