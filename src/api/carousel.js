import request from './request';

// 图片轮播

export function getSliders() {
  return request({
    url: '/api/slider/getSliders',
    method: 'GET'
  });
}
