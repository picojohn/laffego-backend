import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
//import { MorganInterceptor, MorganModule } from 'nest-morgan';
// import { APP_INTERCEPTOR } from '@nestjs/core';
 import { ModulesModule } from './modules/module.module';
 import { ExceptionModule } from './exception/exception.module';
import { getConnectionOptions } from 'typeorm';
//import { MailerModule } from '@nestjs-modules/mailer';
//import { CONFIG_MAILER } from './modules/config.general';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env', '.env.development'],
      cache: true,
      isGlobal: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public/'),
    }),
    ExceptionModule,
    TypeOrmModule.forRootAsync({
      useFactory: async () =>
        Object.assign(await getConnectionOptions(), {
          autoLoadEntities: true,
        }),
    }),
   // MorganModule,
    ModulesModule,
  //  MailerModule.forRoot(CONFIG_MAILER)
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // {
    //   provide: APP_INTERCEPTOR,
    //   useClass: MorganInterceptor('dev'),
    // },
  ],
})
export class AppModule { }
