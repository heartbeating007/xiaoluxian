import request from './request';

// 获取网站配置

export function getSetting() {
  return request({
    url: '/api/setting/get',
    method: 'GET'
  });
}
