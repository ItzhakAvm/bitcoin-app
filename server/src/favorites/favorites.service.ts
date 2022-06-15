import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { AddFavoriteDto } from './dto/add-favorite.dto';
import { Favorite } from './entities/favorite.entity';
import { RemoveFavoriteDto } from './dto/remove-favorite.dto';
import { FavoritesRepository } from './favorites.repository';
import { IsFavoriteDto } from './dto/is-favorite.dto';

@Injectable()
export class FavoritesService {
  constructor(private favoritesRepository: FavoritesRepository) {}

  getAll(): Promise<Favorite[]> {
    return this.favoritesRepository.find();
  }

  async isFavorite(isFavoriteDto: IsFavoriteDto): Promise<boolean> {
    return await this.favoritesRepository.isFavorite(isFavoriteDto);
  }

  async addFavorite(addFavoriteDto: AddFavoriteDto): Promise<Favorite> {
    if (await this.isFavorite({ date: addFavoriteDto.date })) {
      throw new BadRequestException();
    }

    return this.favoritesRepository.addFavorite(addFavoriteDto);
  }

  removeFavorite(removeFavoriteDto: RemoveFavoriteDto): Promise<boolean> {
    const result = this.favoritesRepository.removeFavorite(removeFavoriteDto);

    if (!this.favoritesRepository.removeFavorite(removeFavoriteDto)) {
      throw new NotFoundException();
    }

    return result;
  }
}
