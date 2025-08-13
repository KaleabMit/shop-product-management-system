/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Param, Delete, Res, UseGuards, Req } from '@nestjs/common';
import { Response } from 'express';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserLoginDto } from './dto/user-login.dto';
import { CurrentUser } from './user.decorator';
import { CurrentUserGuard } from './current-user.guard';
import { User } from './entities/user.entity';
import { AuthGuard } from '@nestjs/passport';
import { ACGuard, UseRoles } from 'nest-access-control';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
@Post('login')
async userLogin(@Body() userLoginDto:UserLoginDto,@Res() res:Response) {
const{token,user}=await this.userService.login(userLoginDto);


res.cookie('IsAuthenticated', true, {maxAge:2*60*60*1000})
res.cookie('Authentication',token,{
  httpOnly:true,
  maxAge:2*60*60*1000
}); 
return res.send( {success:true,user});
}

@Post("register")
// @UseGuards(AuthGuard('jwt'), ACGuard)
// @UseRoles({ action: 'create', possession: 'any', resource: 'user' })
async userRegistration(@Body() userCreateDto: CreateUserDto) {
  return this.userService.register(userCreateDto);
}


@Get('authstatus')
@UseGuards(CurrentUserGuard)
authStatus(@CurrentUser() user:User){
  return{status: !!user,user}
}


@Post('logout')
logout(@Req() req:Request,@Res() res: Response){
  res.clearCookie("Authentication");
  res.clearCookie("IsAuthentication");
  return res.status(200).send({success:true});
}

@Get('users')
@UseGuards(CurrentUserGuard)
async getuser(){
    return this.userService.findAll();
}

@Get('users/:id')
@UseGuards(CurrentUserGuard)
async getOneUser(@Param('id') id:number){
return this.userService.findOne(id);
}

// @Patch(':id')
// @UseGuards(CurrentUserGuard)
// async updateUser(@Param('id') id: number, @Body() updateAuthDto: UpdateAuthDto) {
//   return this.authService.updateUser(id, updateAuthDto);
// }


@Delete(':id')
@UseGuards(CurrentUserGuard)
@UseGuards(AuthGuard('jwt'), ACGuard)
@UseRoles({ action: 'delete', possession: 'any', resource: 'user' })
async deleteUser(@Param('id') id: number) {
  return this.userService.remove(id);
}


}
