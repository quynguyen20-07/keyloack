import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import KeycloakModule from 'nestjs-keycloak';

import { UserEntity } from './modules/users/entities';
import { UserModule } from './modules/users/user.module';
import { RoleModule } from './modules/roles/role.module';
import { RoleEntity } from './modules/roles/entities';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    KeycloakModule.register({
      realm: 'quy-test',
      clientId: 'account',
      baseUrl: '${authBaseUrl}',
      clientSecret: '',
    }),
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '123123',
      database: 'mrqcoffee',
      entities: [RoleEntity, UserEntity],
      synchronize: true,
    }),
    AuthModule,
    RoleModule,
    UserModule,
  ],
})
export class AppModule {}
