import {
  Body,
  Controller,
  Post,
  Request,
  Response,
  Param,
  Delete,
  Get,
  Put
} from '@nestjs/common';
import { todoservices } from './todo.services';
import * as mongoose from 'mongoose';

@Controller()
export class todocontroller {
  constructor(private readonly todoservices: todoservices) { }

  @Post('addtodo/:id')
  async add_todo(
    @Body('todo_description') todo_description: string,
    @Param('id') id: mongoose.Types.ObjectId,
    @Response() res,
    @Request() req,
  ) {
    console.log(todo_description);

    if (!todo_description) {
      return res.status(403).send({
        status: 403,
        message: `Please fill todo description`,
      });
    }

    try {
      const add_todo = await this.todoservices.addTodo(todo_description, id);

      return res.status(201).send({
        status: 201,
        message: 'tODO registered Successfully',
      });
    } catch (err) {
      console.log('Error in register', err);
      return res.status(404).send({ message: 'Server error' });
    }
  }

  @Get('getTodo/:user_id')
  async getTodo(
    @Param('user_id') user_id: mongoose.Types.ObjectId,
    @Response() res,
    @Request() req,
  ) {

    try {
      const data = await this.todoservices.getTodo(user_id);

      return res.status(201).send({
        data
      });

    } catch (err) {
      console.log('Error in register', err);
      return res.status(404).send({ message: 'Server error' });
    }
  }


  @Delete('deleteTodo/:_id')
  async delete_Todo(@Param('_id') _id: mongoose.Types.ObjectId, @Response() res, @Request() req,) {
    try {
      const add_todo = await this.todoservices.deleteTodo(_id);

      return res.status(201).send({
        status: 201,
        message: "Data returned successfully",
      });
    } catch (err) {
      console.log('Error in register', err);
      return res.status(404).send({ message: 'Server error' });
    }
  }

  @Put('updateTodo/:_id')
  async update_Todo(@Param('_id') _id: mongoose.Types.ObjectId, @Body('todo_description') todo_description: string, @Response() res, @Request() req,) {
    try {
      const add_todo = await this.todoservices.updateTodo(todo_description, _id);

      return res.status(201).send({
        status: 201,
        message: "Data returned successfully",
      });
    } catch (err) {
      console.log('Error in register', err);
      return res.status(404).send({ message: 'Server error' });
    }
  }


}






