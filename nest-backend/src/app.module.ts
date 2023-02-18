import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { todoModule } from './todo/todo.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [UserModule, todoModule,
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(`mongodb+srv://admin:admin@javaapi.evp6tqb.mongodb.net/?retryWrites=true&w=majority`),
  ],

})
export class AppModule { }
