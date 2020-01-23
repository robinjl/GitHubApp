import types from './types';
import DataStore from '../expand/dao/DataStore';
import { call } from 'react-native-reanimated';

export function fetchPopular(storeName, url, pageSize) {
  return dispatch => {
    dispatch({
      type: types.POPULAR_FETCH,
      storeName,
      hideLoadingMore: true
    });
    const dataStore = new DataStore();
    dataStore
      .fetchData(url)
      .then(data => {
        if (data && data.data) {
          const { items } = data.data;
          dispatch({
            type: types.POPULAR_FETCH_SUCCESS,
            storeName,
            originData: items, // 保存原始数据
            data: pageSize > items.length ? items : items.slice(0, pageSize), // 首次获取数据
            pageNumber: 1
          });
        }
      })
      .catch(error => {
        dispatch({
          type: types.POPULAR_FETCH_FAIL,
          storeName,
          error
        });
      });
  };
}

/**
 * GitHub 一次请求返回 30 条数据，此方法模拟分页加载
 * @param storeName
 * @param pageNumber
 * @param pageSize
 * @param originData
 * @param callback
 * @returns {function(...[*]=)}
 */

export function fetchMorePopular(
  storeName,
  pageNumber,
  pageSize,
  originData,
  callback
) {
  return dispatch => {
    const len = originData.length;
    setTimeout(() => {
      if ((pageNumber - 1) * pageSize >= len) {
        // 没有更多数据
        dispatch({
          type: types.POPULAR_FETCH_MORE_FAIL,
          storeName,
          error: 'no more',
          pageNumber: --pageNumber
        });
        if (typeof callback === 'function') {
          callback('no more');
        }
      } else {
        const count = pageNumber * pageSize > len ? len : pageNumber * pageSize;
        dispatch({
          type: types.POPULAR_FETCH_MORE_SUCCESS,
          storeName,
          data: originData.slice(0, count),
          pageNumber
        });
      }
    }, 500);
  };
}
