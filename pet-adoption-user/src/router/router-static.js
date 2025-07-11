import Vue from 'vue';
import storage from "@/utils/storage";
//配置路由
import VueRouter from 'vue-router'
Vue.use(VueRouter);
//1.创建组件
import Index from '@/views/index'
import Home from '@/views/home/index'
import Login from '@/views/login'
import NotFound from '@/views/404'
import register from '@/views/register'

import PagePet from '@/views/pet'
import PagePetAdopt from '@/views/pet/adopt'
import PageCenter from '@/views/center/index'
import PageAdoptionNotice from '@/views/adoption/notice'
import PageKnowledge from '@/views/knowledge'
import PageKnowledgeDetail from '@/views/knowledge/detail'
import PageNews from '@/views/news'
import PageNewsDetail from '@/views/news/detail'



//2.配置路由   注意：名字
const routes = [{
    path: '/index',
    name: '首页',
    component: Index,
    children: [
      {
        // 这里不设置值，是把main作为默认页面
        path: '/',
        name: '首页',
        component: Home,
        meta: {icon:'', title:'center'}
      },
      {
        path: '/pet',
        name: '宠物列表',
        component: PagePet
      },
      {
        path: '/pet/adopt/:id',
        name: '宠物领养',
        component: PagePetAdopt
      },
      {
        path: '/adoption/notice',
        name: '领养须知',
        component: PageAdoptionNotice
      },
      {
        path: '/knowledge',
        name: '宠物小知识',
        component: PageKnowledge
      },
      {
        path: '/knowledge/detail/:id',
        name: '宠物小知识详情',
        component: PageKnowledgeDetail
      },
      {
        path: '/news',
        name: '公告',
        component: PageNews
      },
      {
        path: '/news/detail/:id',
        name: '公告详情',
        component: PageNewsDetail
      },
      {
        path: '/center',
        name: '个人中心',
        component: PageCenter,
      },

    ]
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {icon:'', title:'login'}
  },
  {
    path: '/register',
    name: 'register',
    component: register,
    meta: {icon:'', title:'register'}
  },
  {
    path: '/',
    name: '首页',
    redirect: '/index'
  }, /*默认跳转路由*/
  {
    path: '*',
    component: NotFound
  }
]
//3.实例化VueRouter  注意：名字
const router = new VueRouter({
  mode: 'hash',
  /*hash模式改为history*/
  routes, // （缩写）相当于 routes: routes
  // scrollBehavior(to, from, savedPosition) {
  //   if (savedPosition) {
  //     return savedPosition; // 如果保存了滚动位置，则返回该位置
  //   } else {
  //     return { x: 0, y: 0 }; // 否则滚动到顶部
  //   }
  // }
})
// 设置放行的路由
const whiteRoute =[
  '/login',
  '/register',
  '/404',
  '/',
  '/index',
  '/home',
  '/pet',
  '/knowledge',
  '/news',
]

router.beforeEach((to, from, next) => {

  const token = storage.get("Token")
  // 未登录且目标路由不是登录页，跳转至登录页
  if (!token && !whiteRoute.includes(to.path)) {
    const gotoPath = to.path
    return next({
      name: "login",
      query: {
        redirect: gotoPath
      }
    })
  }


  return next()
})

export default router;
