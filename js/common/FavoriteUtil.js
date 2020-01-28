import { TAB_FLAG } from '../common/constants';

export default class FavoriteUtil {
  /**
   * 点击收藏
   * @param item
   * @param isFavorite
   * @param flag
   * @param favoriteDAO
   */
  static onFavorite(item, isFavorite, flag, favoriteDAO){
    const key = flag === TAB_FLAG.popular ? item.id.toString() : item.fullName;
    if(isFavorite){
      favoriteDAO.saveFavoriteKey(key, JSON.stringify(item));
    }else{
      favoriteDAO.removeFavoriteKey(key);
    }
  }
}
