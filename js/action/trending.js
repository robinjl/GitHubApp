import types from './types';
import DataStore from '../expand/dao/DataStore';
import { TAB_FLAG } from '../common/constants';

export function fetchTrending(storeName, url, pageSize) {
  return dispatch => {
    dispatch({
      type: types.TRENDING_FETCH,
      storeName,
      hideLoadingMore: true
    });
    const dataStore = new DataStore();
    dataStore
      .fetchData(url, TAB_FLAG.trending)
      .then(data => {
        if (data && data.data) {
          const items = data.data;
          dispatch({
            type: types.TRENDING_FETCH_SUCCESS,
            storeName,
            originData: items, // 保存原始数据
            data: pageSize > items.length ? items : items.slice(0, pageSize), // 首次获取数据
            pageNumber: 1
          });
        }
      })
      .catch(error => {
        dispatch({
          type: types.TRENDING_FETCH_FAIL,
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

export function fetchMoreTrending(
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
          type: types.TRENDING_FETCH_MORE_FAIL,
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
          type: types.TRENDING_FETCH_MORE_SUCCESS,
          storeName,
          data: originData.slice(0, count),
          pageNumber
        });
      }
    }, 500);
  };
}
