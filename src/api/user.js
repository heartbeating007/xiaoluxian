import request from './request';

// 登录/注册

// 用户名密码登录
export function loginByJson(data) {
  return request({
    url: '/api/u/loginByJson',
    method: 'POST',
    data
  });
}

//发送注册或登录验证码
export function sendCaptcha(params) {
  return request({
    url: '/api/sms/sendRegisterOrLoginCaptcha',
    method: 'GET',
    params
  });
}

//手机验证码登录
export function loginByMobile(data) {
  return request({
    url: '/api/u/loginByMobile',
    method: 'post',
    data
  });
}

// 获取用户信息
export function getInfo(params) {
  return request({
    url: '/api/member/getInfo',
    method: 'GET',
    params
  });
}

// 创建临时token

export function createToken() {
  return request({
    url: '/api/token/createToken',
    method: 'GET'
  });
}

// 退出登录

export function logout() {
  return request({
    url: '/api/u/logout',
    method: 'GET'
  });
}
