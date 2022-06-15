import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { CryptoModule } from './crypto/crypto.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FavoritesModule } from './favorites/favorites.module';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_UNAME,
      password: process.env.DB_PASSWD,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: true,
    }),
    CryptoModule,
    FavoritesModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
  ],
})
export class AppModule {}
