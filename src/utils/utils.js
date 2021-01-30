import Cookies from 'js-cookie'
import { BASEURL } from '../utils/config'

// 获取cookie里的token
export function getCookieToken() {
    return Cookies.get('token');
 }

 // 获取页面宽度
 export function getPageWidth() {
     return window.innerWidth + 'px'
 }
 
 // 根据key获取cookie里的值
 export function getCookieVal(key = "") {
     return Cookies.get(key)
 }

 // 自定义table高度
export function getTableHeight(height = 0) {
    return window.innerHeight - height
}

// 根据key获取数组value
export function getArrayProps(arr, key) {
    let keys = `${key}`
    let res = []
    if(arr.length > 0) {
        arr.forEach(t => {
            res.push(t[keys])
        })
    }
    return res
}

// 图片路径转换
export function imgFormat(value) {
    if(value && value.startsWith('http')) {
        return value
    }else if(value) {
        return BASEURL + value
    }else {
        return null
    }
}

