import AsyncStorage from '@react-native-community/async-storage';
import { FAVORITE_KEY_PREFIX } from '../../common/constants';

export default class FavoriteDAO {
  constructor(flag) {
    this.favoriteKey = FAVORITE_KEY_PREFIX + flag;
  }

  /**
   * 收藏项目
   * @param key
   * @param value
   * @param callback
   */
  saveFavoriteKey(key, value, callback) {
    AsyncStorage.setItem(key, value, error => {
      if (!error) {
        this.updateFavoriteKeys(key, true);
      }
    });
  }

  /**
   * 取消收藏
   * @param key
   */
  removeFavoriteKey(key) {
    AsyncStorage.removeItem(key, error => {
      if (!error) {
        this.updateFavoriteKeys(key, false);
      }
    });
  }

  /**
   * 更新收藏项目 keys
   * @param key
   * @param isAdd
   */
  updateFavoriteKeys(key, isAdd) {
    AsyncStorage.getItem(this.favoriteKey, (error, result) => {
      if (!error) {
        let favoriteKeys = [];
        if (result) {
          favoriteKeys = JSON.parse(result);
        }
        let index = favoriteKeys.indexOf(key);
        if (isAdd) {
          if (index === -1) {
            // 新增且不存在数组中
            favoriteKeys.push(key);
          }
        } else {
          if (index !== -1) {
            // 删除且存在数组中
            favoriteKeys.splice(index, 1);
          }
        }
        AsyncStorage.setItem(this.favoriteKey, JSON.stringify(favoriteKeys));
      }
    });
  }

  /**
   * 获取收藏项目 keys
   * @returns {Promise<R>}
   */
  getFavoriteKeys() {
    return new Promise((resolve, reject) => {
      AsyncStorage.getItem(this.favoriteKey, (error, result) => {
        if (!error) {
          try {
            resolve(JSON.parse(result));
          } catch (e) {
            reject(error);
          }
        } else {
          reject(error);
        }
      });
    });
  }

  /**
   * 获取所有收藏项目
   * @returns {Promise<R>}
   */
  getFavorites() {
    return new Promise((resolve, reject) => {
      this.getFavoriteKeys()
        .then(keys => {
          let items = [];
          if (keys) {
            AsyncStorage.multiGet(keys, (error, result) => {
              try {
                result.forEach(item => {
                  const value = item[1];
                  if (value) items.push(JSON.parse(value));
                });
                resolve(items);
              } catch (e) {
                reject(error);
              }
            });
          } else {
            resolve(items);
          }
        })
        .catch(e => {
          reject(e);
        });
    });
  }
}
