import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TodoInfo } from './todoSchema.model';
import * as mongoose from 'mongoose';

@Injectable()
export class todoservices {
  constructor(
    @InjectModel('todoDetails') private readonly todoModel: Model<TodoInfo>,
  ) { }

  async addTodo(todo_description: string, id: mongoose.Types.ObjectId) {
    const todo = new this.todoModel({
      todo_description,
      user_id: id,
    });

    const addTodo = await todo.save();
    return addTodo;
  }

  async getTodo(user_id: mongoose.Types.ObjectId) 
  {
      /// const getalltodo = new this.todoModel({ user_id : user_id})
      // console.log(" getalltod ", getalltodo);
       const todo = await this.todoModel.find({user_id}).exec();
       console.log( " todo ", todo);
       return todo;

  }
  async deleteTodo(_id: mongoose.Types.ObjectId) 
  {
      /// const getalltodo = new this.todoModel({ user_id : user_id})
      // console.log(" getalltod ", getalltodo);
       const todo = await this.todoModel.deleteOne({_id}).exec();
       console.log( " todo deleted ", todo);

  }

  // async updateTodo(todo_description: string , _id: mongoose.Types.ObjectId) 
  // {
  // const todo1 = new this.todoModel({
  //   todo_description,
  //   user_id: _id,
  // });
  
  // const updateTodo = await this.todoModel.updateOne({todo1});
  // console.log(updateTodo);

  //     // const todo = await this.todoModel.updateOne({_id , todo_description}).exec();
  //    //  console.log( " todo updated ", todo);

  // }

  async updateTodo(
  
    todo_description: string,  _id: any
  ) {
    return await this.todoModel.findByIdAndUpdate(_id, {
      todo_description
    
    });
  }

}
