import request from './request';

// 课程管理api

// 查询课程标签

export function tagsList(data) {
  return request({
    url: '/api/course/tags/list',
    method: 'POST',
    data
  });
}

// 查询课程
export function searchCourse(data) {
  return request({
    url: '/api/course/search',
    method: 'POST',
    data
  });
}

// 查询最新课程

export function mostNew(data) {
  return request({
    url: '/api/course/mostNew',
    method: 'POST',
    data
  });
}

// 课程详情

export function getDetail(params) {
  return request({
    url: '/api/course/getDetail',
    method: 'GET',
    params
  });
}

//检查课程是否有下载权限
export function courseCheckAuth(params) {
  return request({
    url: '/api/course/checkAuth',
    params
  });
}

//下载课程资料
export function downloadAttachment(params) {
  return request({
    url: '/api/course/downloadAttachment',
    params,
    responseType: 'blob'
  });
}

//播放课程
export function player(params) {
  return request({
    url: '/api/player/play',
    method: 'GET',
    params
  });
}
