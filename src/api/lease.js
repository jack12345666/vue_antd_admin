import request from '@/utils/request';
import { stringify } from 'qs'

// 上传文件
export function uploadFile(data) {
  return request({
      url: '/common/upload',
      headers: {"Content-Type": "multipart/form-data"},
      method: 'post',
      data: data
  })
}

// 获取厂房列表(员工)
export function getLeaseList(data) {
  return request({
    url: '/building/leaseListByEmployee',
    method: 'post',
    data: stringify(data)
  })
}

// 获取厂房列表(管理员)
export function getLeaseListAdmin(data) {
  return request({
    url: '/building/leaseList',
    method: 'post',
    data: stringify(data)
  })
}


// 获取厂房详情
export function getLeaseDetail(id) {
  return request({
    url: `/building/detail/${id}`,
    method: 'get'
  })
}

// 添加厂房信息
export function addLease(data) {
  return request({
    url: '/building/addBuilding',
    method: 'post',
    data: stringify(data)
  })
}

// 修改厂房信息
export function updateLease(data) {
  return request({
    url: '/building/update',
    method: 'post',
    data: stringify(data)
  })
}

// 删除厂房
export function deleteLease(id) {
  return request({
    url: '/building/delete',
    method: 'post',
    data: `id=${id}`
  })
}


// 获取区域列表
export function getAreaList(data) {
  return request({
    url: '/commonCategory/categoryList',
    method: 'post',
    data: stringify(data)
  })
}