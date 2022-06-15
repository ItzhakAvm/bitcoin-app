import { Controller, Delete, Get, Post, Query } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { AddFavoriteDto } from './dto/add-favorite.dto';
import { Favorite } from './entities/favorite.entity';
import { RemoveFavoriteDto } from './dto/remove-favorite.dto';

@Controller('favorites')
export class FavoritesController {
  constructor(private favoritesService: FavoritesService) {}

  @Get()
  getAll(): Promise<Favorite[]> {
    return this.favoritesService.getAll();
  }

  @Post()
  addFavorite(@Query() addFavoriteDto: AddFavoriteDto): Promise<Favorite> {
    return this.favoritesService.addFavorite(addFavoriteDto);
  }

  @Delete()
  removeFavorite(
    @Query() removeFavoriteDto: RemoveFavoriteDto,
  ): Promise<boolean> {
    return this.favoritesService.removeFavorite(removeFavoriteDto);
  }
}
