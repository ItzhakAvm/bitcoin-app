import { Module } from '@nestjs/common';
import { FavoritesController } from './favorites.controller';
import { FavoritesService } from './favorites.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FavoritesRepository } from './favorites.repository';

@Module({
  imports: [TypeOrmModule.forFeature([FavoritesRepository])],
  controllers: [FavoritesController],
  providers: [FavoritesService],
})
export class FavoritesModule {}
