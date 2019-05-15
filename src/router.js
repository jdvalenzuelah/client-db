import Vue from 'vue'
import Router from 'vue-router'
import LogIn from '@/components/LogIn.vue'
import ListUsers from '@/components/admin/ListUsers.vue'
import Product from '@/components/common/product/Products.vue'
import NewSale from '@/components/common/invoice/NewSale.vue'


Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'LogIn',
      component: LogIn
    },
    {
        path: 'admin/users',
        name: 'ListUsers',
        component: ListUsers
    },
    {
      path: '/products',
      name: 'Products',
      component: Product
  },
  {
    path: '/sale/new',
    name: 'NewSale',
    component: NewSale
  }
  ]
})
