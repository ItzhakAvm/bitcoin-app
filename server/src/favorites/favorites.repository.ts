import { EntityRepository, Repository } from 'typeorm';
import { AddFavoriteDto } from './dto/add-favorite.dto';
import { RemoveFavoriteDto } from './dto/remove-favorite.dto';
import { Favorite } from './entities/favorite.entity';
import { IsFavoriteDto } from './dto/is-favorite.dto';

@EntityRepository(Favorite)
export class FavoritesRepository extends Repository<Favorite> {
  async isFavorite(isFavoriteDto: IsFavoriteDto): Promise<boolean> {
    return (await this.find(isFavoriteDto)).length > 0;
  }

  addFavorite(addFavoriteDto: AddFavoriteDto): Promise<Favorite> {
    return this.save(this.create(addFavoriteDto));
  }

  async removeFavorite(removeFavoriteDto: RemoveFavoriteDto): Promise<boolean> {
    return (await this.delete(removeFavoriteDto)).affected > 0;
  }
}
