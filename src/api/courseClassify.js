import request from './request';

// 课程分类api

// 获取一级课程分类

export function getFirstCategorys() {
  return request({
    url: '/api/course/category/getFirstCategorys',
    method: 'GET'
  });
}

// 获取二级课程分类

export function getSecondCategorys(params) {
  return request({
    url: '/api/course/category/getSecondCategorys',
    method: 'GET',
    params
  });
}
