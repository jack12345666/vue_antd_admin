import Vue from 'vue'
import Router from 'vue-router'
const Lease = () => import('@/views/lease')
const EditLease = () => import('@/views/editLease')
const AddLease = () => import('@/views/addLease')
const LeaseDetail = () => import('@/views/leaseDetail')
const LeaseAdmin = () => import('@/views/leaseAdmin')
const OutletsAdmin = () => import('@/views/outletsAdmin')
const Outlets = () => import('@/views/outlets')

Vue.use(Router)

const router = new Router({
  mode: 'hash',
  routes: [
    { path: '/', component: Lease, name: 'lease', meta: {title: '投资钱塘-杭州钱塘新区投资之家'} }, 
    { path: '/editLease', component: EditLease, name: 'editLease', meta: {title: '投资钱塘-杭州钱塘新区投资之家'} }, 
    { path: '/addLease', component: AddLease, name: 'addLease', meta: {title: '投资钱塘-杭州钱塘新区投资之家'} }, 
    { path: '/leaseDetail', component: LeaseDetail, name: 'leaseDetail', meta: {title: '投资钱塘-杭州钱塘新区投资之家'} }, 
    { path: '/leaseManager', component: LeaseAdmin, name: 'LeaseAdmin', meta: {title: '投资钱塘-杭州钱塘新区投资之家'} }, 
    { path: '/outlets', component: Outlets, name: 'Outlets', meta: {title: '投资钱塘-杭州钱塘新区投资之家'} }, 
    { path: '/outletsManager', component: OutletsAdmin, name: 'OutletsAdmin', meta: {title: '投资钱塘-杭州钱塘新区投资之家'} }, 
  ]
})

router.beforeEach((to, from, next) => {
	if (to.meta.title) {
    document.title = to.meta.title;
  }else{ 
    document.title = '杭州钱塘新区投资之家'
  }
  next()
})

export default router
 