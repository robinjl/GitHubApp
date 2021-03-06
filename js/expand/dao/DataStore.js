import AsyncStorage from '@react-native-community/async-storage';
import { TAB_FLAG } from '../../common/constants';
import GitHubTrending from 'GitHubTrending';

export default class DataStore {
  // 保存数据
  saveData(url, data, callback) {
    if (url && data) {
      void AsyncStorage.setItem(url, this._formatData(data), callback);
    }
  }

  _formatData(data) {
    return JSON.stringify({ data, timestamp: new Date().getTime() });
  }

  // 获取本地数据
  fetchLocalData(url) {
    return new Promise((resolve, reject) => {
      AsyncStorage.getItem(url, (error, result) => {
        if (!error) {
          try {
            resolve(JSON.parse(result));
          } catch (e) {
            reject(e);
          }
        } else {
          reject(error);
        }
      });
    });
  }

  // 获取服务器数据
  fetchRemoteData(url, flag) {
    return new Promise((resolve, reject) => {
      if (flag === TAB_FLAG.popular) {
        fetch(url)
          .then(response => {
            if (response.ok) {
              return response.json();
            }
            throw new Error('Something is wrong with network!');
          })
          .then(response => {
            this.saveData(url, response);
            resolve(response);
          })
          .catch(error => {
            reject(error);
          });
        return;
      }
      new GitHubTrending()
        .fetchTrending(url)
        .then(response => {
          if (!response) {
            throw new Error('no response');
          }
          this.saveData(url, response);
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  // 根据离线策略获取数据
  fetchData(url, flag) {
    return new Promise((resolve, reject) => {
      this.fetchLocalData(url)
        .then(response => {
          if (response && this.checkTimestampValid(response.timestamp)) {
            resolve(response);
          } else {
            this.fetchRemoteData(url, flag)
              .then(response => {
                resolve(this._formatData(response));
              })
              .catch(error => {
                reject(error);
              });
          }
        })
        .catch(error => {
          this.fetchRemoteData(url)
            .then(response => {
              resolve(this._formatData(response));
            })
            .catch(error => {
              reject(error);
            });
        });
    });
  }

  // 校验时间戳
  checkTimestampValid(timestamp) {
    const current = new Date();
    const target = new Date();
    target.setTime(timestamp);
    return !(
      current.getMonth() !== target.getMonth() ||
      current.getDate() !== target.getDate() ||
      current.getHours() - target.getHours() > 4
    );
  }
}
