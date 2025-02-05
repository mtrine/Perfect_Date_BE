import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { RoleModule } from './modules/role/role.module';
import { PermissionsModule } from './modules/permissions/permissions.module';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { KeyTokenModule } from './key-token/key-token.module';

@Module({
  imports: [
    ConfigModule.forRoot(
      { isGlobal: true, }
    ),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URI'),
      }),
      inject: [ConfigService],
    }),
    UserModule, 
    AuthModule, 
    RoleModule, 
    PermissionsModule, KeyTokenModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
