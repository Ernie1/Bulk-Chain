import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/views/layout/Layout'

/* Router Modules */
import componentsRouter from './modules/components'
import chartsRouter from './modules/charts'
import tableRouter from './modules/table'
import nestedRouter from './modules/nested'

/** note: submenu only apppear when children.length>=1
 *  detail see  https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 **/

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    roles: ['admin','editor']     will control the page roles (you can set multiple roles)
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
    noCache: true                if true ,the page will no be cached(default is false)
  }
**/
export const constantRouterMap = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/authredirect',
    component: () => import('@/views/login/authredirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/errorPage/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/errorPage/401'),
    hidden: true
  },
  {
    path: '',
    component: Layout,
    redirect: 'dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: 'dashboard', icon: 'dashboard', noCache: true }
      }
    ]
  }
]

export default new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

// member
export const asyncRouterMap = [
  {
    path: '/application',
    component: Layout,
    meta : { roles: ['member'] },
    children: [
      {
        path: 'member',
        component: () => import('@/views/application/member'),
        name: 'Application',
        meta: {
          title: 'application',
          icon: 'link',
        }
      }
    ]
  },
  {
    path: '/my-warehouse-receipt',
    component: Layout,
    meta : { roles: ['member'] },
    children: [
      {
        path: 'member',
        component: () => import('@/views/my-warehouse-receipt/member'),
        name: 'MyWarehouseReceipt',
        meta: {
          title: 'myWarehouseReceipt',
          icon: 'documentation',
        }
      }
    ]
  },
  {
    path: '/my-client',
    component: Layout,
    meta : { roles: ['member'] },
    children: [
      {
        path: 'member',
        component: () => import('@/views/my-client/member'),
        name: 'MyClient',
        meta: {
          title: 'myClient',
          icon: 'peoples',
        }
      }
    ]
  },
  // bank
  {
    path: '/application',
    component: Layout,
    meta : { roles: ['bank'] },
    children: [
      {
        path: 'bank',
        component: () => import('@/views/application/bank'),
        name: 'Application',
        meta: {
          title: '申请列表',
          icon: 'link'
        }
      }
    ]
  },
  {
    path: '/my-client',
    component: Layout,
    meta : { roles: ['bank'] },
    children: [
      {
        path: 'bank',
        component: () => import('@/views/my-client/bank'),
        name: 'MyClient',
        meta: {
          title: 'myClient',
          icon: 'peoples',
        }
      }
    ]
  },
  // storage
  {
    path: '/application',
    component: Layout,
    meta : { roles: ['storage'] },
    children: [
      {
        path: 'storage',
        component: () => import('@/views/application/storage'),
        name: 'Application',
        meta: {
          title: '申请列表',
          icon: 'link'
        }
      }
    ]
  },
  {
    path: '/warehouse-receipt-handle',
    component: Layout,
    meta : { roles: ['storage'] },
    children: [
      {
        path: 'storage',
        component: () => import('@/views/warehouse-receipt-handle/storage'),
        name: 'WarehouseReceiptHandle',
        meta: {
          title: '仓单处理',
          icon: 'nested',
        }
      }
    ]
  },
  {
    path: '/my-warehouse-receipt',
    component: Layout,
    meta : { roles: ['storage'] },
    children: [
      {
        path: 'storage',
        component: () => import('@/views/my-warehouse-receipt/storage'),
        name: 'MyWarehouseReceipt',
        meta: {
          title: 'myWarehouseReceipt',
          icon: 'documentation',
        }
      }
    ]
  },
  // exchange
  {
    path: '/application',
    component: Layout,
    meta : { roles: ['exchange'] },
    children: [
      {
        path: 'exchange',
        component: () => import('@/views/application/exchange'),
        name: 'Application',
        meta: {
          title: '申请列表',
          icon: 'link'
        }
      }
    ]
  },
  {
    path: '/warehouse-receipt-handle',
    component: Layout,
    meta : { roles: ['exchange'] },
    children: [
      {
        path: 'exchange',
        component: () => import('@/views/warehouse-receipt-handle/exchange'),
        name: 'WarehouseReceiptHandle',
        meta: {
          title: '仓单处理',
          icon: 'nested',
        }
      }
    ]
  },
  {
    path: '/my-warehouse-receipt',
    component: Layout,
    meta : { roles: ['exchange'] },
    children: [
      {
        path: 'exchange',
        component: () => import('@/views/my-warehouse-receipt/exchange'),
        name: 'MyWarehouseReceipt',
        meta: {
          title: 'myWarehouseReceipt',
          icon: 'documentation',
        }
      }
    ]
  },
  // origin
  {
    path: '/permission',
    component: Layout,
    redirect: '/permission/index',
    alwaysShow: true, // will always show the root menu
    meta: {
      title: 'permission',
      icon: 'lock',
      roles: ['admin'] // you can set roles in root nav
    },
    children: [
      {
        path: 'page',
        component: () => import('@/views/permission/page'),
        name: 'PagePermission',
        meta: {
          title: 'pagePermission',
          roles: ['admin'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'directive',
        component: () => import('@/views/permission/directive'),
        name: 'DirectivePermission',
        meta: {
          title: 'directivePermission'
          // if do not set roles, means: this page does not require permission
        }
      }
    ]
  },

  {
    path: '/icon',
    component: Layout,
    meta : { roles: ['admin'] },
    children: [
      {
        path: 'index',
        component: () => import('@/views/svg-icons/index'),
        name: 'Icons',
        meta: { title: 'icons', icon: 'icon', noCache: true }
      }
    ]
  },

  /** When your routing table is too long, you can split it into small modules**/
  componentsRouter,
  chartsRouter,
  nestedRouter,
  tableRouter,

  { path: '*', redirect: '/404', hidden: true }
]
