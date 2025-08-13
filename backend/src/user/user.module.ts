/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './entities/user.entity';
import { RolesBuilder } from 'nest-access-control';
import { roles } from './user-roles';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'secret',
      signOptions: { expiresIn: '2h' },
    }),
  ],
  controllers: [UserController],
  providers: [
    UserService,
    {
      provide: RolesBuilder,
      useValue: roles, 
    },
  ],
  exports: [UserService, RolesBuilder], 
})
export class UserModule {}
