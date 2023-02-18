import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './User.Controller';
import { UserService } from './User.Service';
import { SchemaDefine } from './UserSchema.model';


@Module({
    imports : [
        MongooseModule.forFeature([{name : 'userDetails', schema : SchemaDefine}]),
    ],
    controllers : [UserController],
    providers : [UserService]
})

export class UserModule {}