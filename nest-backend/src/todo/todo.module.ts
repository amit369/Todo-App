import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { todocontroller } from './todo.controller';
import { todoservices } from './todo.services';
import { SchemaDefine } from './todoSchema.model';


@Module({
    imports : [
        MongooseModule.forFeature([{name : 'todoDetails', schema : SchemaDefine}]),
    ],
    controllers : [todocontroller],
    providers : [todoservices]
})

export class todoModule {}