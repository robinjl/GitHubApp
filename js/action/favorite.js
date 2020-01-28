import types from './types';
import FavoriteDAO from '../expand/dao/FavoriteDAO';
import {ProjectModel} from '../common/model';

export function fetchFavorite(flag, isLoading){
  return dispatch => {
    dispatch({
      type: types.FAVORITE_FETCH,
      storeName: flag,
    });
    new FavoriteDAO(flag).getFavorites()
      .then(data=>{
        const items = data.map(item=> new ProjectModel(item, true));
        dispatch({
          type: types.FAVORITE_FETCH_SUCCESS,
          data: items,
          storeName: flag,
        })
      }).catch(error=>{
        dispatch({
          type: types.FAVORITE_FETCH_FAIL,
          storeName: flag,
          error,
        })
    })
  }
}
