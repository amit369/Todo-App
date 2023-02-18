import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserInfo } from './UserSchema.model';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('userDetails') private readonly userModel: Model<UserInfo>,
  ) {}

  async register(
    firstname: string,
    lastname: string,
    email: string,
    password: string,
    
  ) {
    const user = new this.userModel({
      firstname,
      lastname,
      email,
      password,
    });

    const addUser = await user.save();
    return addUser;
  }
  async findEmail(email: string) {
    return await this.userModel.findOne({ email }).exec();
  }


}