// import { Module } from '@nestjs/common'; 
// import { ProductModule } from './product/product.module';
// import { ConfigModule } from '@nestjs/config';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
// import { CategoryModule } from './category/category.module';

// @Module({
//   imports: [
//     ConfigModule.forRoot({
//       isGlobal: true,
//     }),
//     TypeOrmModule.forRoot({
//     type:'mysql',
//     database:'products',
//     port:3306,
//     host:'localhost',
//     username:'root',
//     password:'Mysql@@@82987932',
//     autoLoadEntities:true,
//     synchronize:true
//     }),
//     ProductModule,
//     CategoryModule,
//   ],
//   controllers: [AppController],
//   providers: [AppService],
// })
// export class AppModule {}



import { Module } from '@nestjs/common'; 
import { ProductModule } from './product/product.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoryModule } from './category/category.module';
import { PaymentsModule } from './payments/payments.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
    type:'mysql',
    database:'railway',
    port:31564,
    host:'mainline.proxy.rlwy.net',
    username:'root',
    password:'CHMMvHZYBJAKmWupSIYONytDqQwXbiTC',
    autoLoadEntities:true,
    synchronize:true
    }),
    ProductModule,
    CategoryModule,
    PaymentsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}