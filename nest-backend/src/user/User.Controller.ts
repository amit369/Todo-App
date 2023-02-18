import { Body, Controller, Post, Request, Response } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserService } from './User.Service';

@Controller()
export class UserController {
  constructor(private readonly UserService: UserService) { }

  @Post('register')

  async register(
    @Body('firstname') firstname: string,
    @Body('lastname') lastname: string,
    @Body('email') email: string,
    @Body('password') password: string,
    @Response() res,
    @Request() req,
  ) {
    console.log(firstname, lastname, email, password);

    if (!firstname || !lastname || !email || !password) {
      return res.status(403).send({
        status: 403,
        message: `Please fill all the fields`,
      });
    }
    if (!email.includes('@')) {
      return res.status(403).send({
        status: 403,
        message: `Please enter valid email`,
      });
    }

    try {

      const userEmailExist = await this.UserService.findEmail(email);
      if (!userEmailExist) {
        const register = await this.UserService.register(
          firstname,
          lastname,
          email,
          password,

        );

        return res.status(201).send({
          status: 201,
          message: 'User Registered Successfully',
        });
      }
    }
    catch (err) {
      console.log('Error in register', err);
      return res.status(404).send({ message: 'Server error' });
    }

  }

  @Post('login')


  async login(
    @Body('email') email: string,
    @Body('password') password: string,
    @Response() res
  ) {
    if (!email || !password) {
      return res.status(403).send({ message: 'Please fill all the Fields' });
    }
    try {
      const register = await this.UserService.findEmail(email);
      if (register) {
        const isMatch = await bcrypt.compare(password, register.password);
        if (isMatch) {
          const loginId = register._id;
          return res.status(200).send({
            status: 200,
            message: 'Login Successfully',
            register
          });
        }
        return res.status(401).send({ message: 'invalid details' });
      }
      else {
        return res.status(401).send({ message: 'invalid details' });
      }
    }
    catch (err) {
      console.log('Login Error => ', err);
      return res.status(422).send({ message: err || 'Server error' });
    }

  }




}