import request from './request';

// 记录视频播放历史

export function recordHistory(data) {
  return request({
    url: '/api/course/history/recordHistory',
    method: 'POST',
    data
  });
}

// 最后一次记录
export function getLastHistoryByChapterId(params) {
  return request({
    url: '/api/course/history/getLastHistoryByChapterId',
    method: 'GET',
    params
  });
}
