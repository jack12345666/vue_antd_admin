import request from '@/utils/request';
import { stringify } from 'qs'

// 新区网点列表(管理员)
export function getOutletsAdmin(data) {
    return request({
        url: '/outlets/outletsListAdmin',
        method: 'post',
        data: stringify(data)
    })
}

// 新区网点列表(员工)
export function getOutletsEmployee(data) {
    return request({
        url: '/outlets/outletsListByEmployee',
        method: 'post',
        data: stringify(data)
    })
}

// 获取网点详情
export function getOutlestDetail(id) {
    return request({
        url: `/outlets/detail/${id}`,
        method: 'get'
    })
}

// 新增新区网点信息
export function addOutlets(data) {
    return request({
        url: '/outlets/addOutlets',
        method: 'post',
        data: stringify(data)
    })
}

// 修改新区网点信息
export function updateOutlets(data) {
    return request({
        url: '/outlets/updateOutlets',
        method: 'post',
        data: stringify(data)
    })
}

// 获取网点分类
export function outletsCategory(category) {
    return request({
        url: '/commonCategory/categoryList',
        method: 'post',
        data: `category=${category}`
    })
}