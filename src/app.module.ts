import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {ConfigModule, ConfigService} from "@nestjs/config";
import {TypeOrmModule} from "@nestjs/typeorm";
import {getTypeOrmConfig} from "./config/typeorm.config";
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ProductModule } from './product/product.module';
import { FileModule } from './file/file.module'
import { OfferModule } from './offer/offer.module';
import { ChatModule } from './chat/chat.module';

@Module({
  imports: [
      ConfigModule.forRoot(),
      TypeOrmModule.forRootAsync({
        imports:[ConfigModule],
        inject:[ConfigService],
        useFactory: getTypeOrmConfig
      }),
      UserModule,
      AuthModule,
      ProductModule,
      FileModule,
      OfferModule,
      ChatModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
