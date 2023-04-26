import request from './request';

//获取购物车商品
export function getShopCarList() {
  return request({
    url: '/api/shopcar/getShopCarList'
  });
}

//删除购物车
export function deleteShopCar(params, token) {
  return request({
    url: '/api/shopcar/deleteShopCar',
    params,
    headers: {
      token
    }
  });
}

//添加购物车
export function addShopCard(data, token) {
  return request({
    url: '/api/shopcar/addShopCar',
    method: 'POST',
    data,
    headers: {
      token
    }
  });
}

//去结算
export function settlement(data) {
  return request({
    url: '/api/order/settlement',
    method: 'POST',
    data
  });
}

// 支付宝结算

export function alipayOrder(data) {
  return request({
    url: '/api/pay/alipay/createOrder',
    method: 'POST',
    data
  });
}

//查询支付宝，支付订单状态
export function queryAlipay(params) {
  return request({
    url: '/api/pay/alipay/queryOrder',
    params
  });
}

//微信结算
export function wxpayOrder(data) {
  return request({
    url: '/api/pay/wxpay/createOrder',
    method: 'post',
    data
  });
}

//查询微信，支付订单状态
export function queryWxpay(params) {
  return request({
    url: '/api/pay/wxpay/queryOrder',
    params
  });
}

//删除购物车[批量]
export function deleteShopCars(ids, token) {
  return request({
    url: '/api/shopcar/deleteShopCars',
    method: 'POST',
    data: ids,
    headers: {
      token
    }
  });
}
