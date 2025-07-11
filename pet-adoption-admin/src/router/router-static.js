import Vue from 'vue';
//配置路由
import VueRouter from 'vue-router'
Vue.use(VueRouter);
//1.创建组件
import Index from '@/views/index'
import Home from '@/views/home'
import Login from '@/views/login'
import NotFound from '@/views/404'
import UpdatePassword from '@/views/update-password'
import register from '@/views/register'
import center from '@/views/center'

import Admin from '@/views/admin/list'
import AdminDetail from '@/views/admin/addEdit'
import Adoption from '@/views/adoption/list'
import AdoptionDetail from '@/views/adoption/addEdit'
import User from '@/views/user/list'
import UserDetail from '@/views/user/addEdit'
import AdoptionApprove from '@/views/adoption/approve/list'
import AdoptionApproveDetail from '@/views/adoption/approve/addEdit'
import AdoptionPetType from '@/views/adoption/petType/list'
import AdoptionPetTypeDetail from '@/views/adoption/petType/addEdit'
import KnowledgeList from '@/views/knowledge/list'
import KnowledgeDetail from '@/views/knowledge/addEdit'
import KnowledgeTypeList from '@/views/knowledge/type/list'
import KnowledgeTypeDetail from '@/views/knowledge/type/addEdit'
import KnowledgeInteractionsList from '@/views/knowledge/interactions/list'
import KnowledgeInteractionsDetail from '@/views/knowledge/interactions/addEdit'
import KnowledgeCommentList from '@/views/knowledge/comment/list'
import KnowledgeCommentDetail from '@/views/knowledge/comment/addEdit'
import NewsList from '@/views/news/list'
import NewsDetail from '@/views/news/addEdit'
import NewsTypeList from '@/views/news/type/list'
import NewsTypeDetail from '@/views/news/type/addEdit'
import CarouselList from '@/views/system/carousel/list'
import CarouselDetail from '@/views/system/carousel/addEdit'
import FeedbackList from '@/views/feedback/list'
import FeedbackDetail from '@/views/feedback/addEdit'
import FeedbackAdd from '@/views/feedback/add'
import FeedbackTypeList from '@/views/feedback/feedback-type/list'
import FeedbackTypeDetail from '@/views/feedback/feedback-type/addEdit'
import FeedbackQuestionTypeList from '@/views/feedback/question-type/list'
import FeedbackQuestionTypeDetail from '@/views/feedback/question-type/addEdit'


        
  

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
        path: '/center',
        name: '个人信息',
        component: center,
        meta: {icon:'', title:'center'}
      },
      {
        path: '/updatePassword',
        name: '修改登录密码',
        component: UpdatePassword,
        meta: {icon:'', title:'updatePassword'}
      }, 
      {
        path: '/admin/list',
        name: '管理员信息',
        component: Admin
      },
      {
        path: '/admin/detail/:id/:type',
        name: '管理员信息',
        component: AdminDetail,
      },
      {
        path: '/user/list',
        name: '用户信息',
        component: User
      },
      {
        path: '/user/detail/:id/:type',
        name: '用户信息',
        component: UserDetail
      },
      {
        path: '/adoption/list',
        name: '宠物领养',
        component: Adoption
      },
      {
        path: '/adoption/detail/:id/:type',
        name: '宠物领养',
        component: AdoptionDetail,
      },
      {
        path: '/adoption/approval',
        name: '领养审核',
        component: AdoptionApprove
      },
      {
        path: '/adoption/approval/detail/:id/:type',
        name: '领养审核',
        component: AdoptionApproveDetail
      },
      {
        path: '/adoption/petType',
        name: '宠物类型',
        component: AdoptionPetType
      },
      {
        path: '/adoption/petType/detail/:id/:type',
        name: '宠物类型',
        component: AdoptionPetTypeDetail
      },
      {
        path: '/knowledge/list',
        name: '知识列表',
        component: KnowledgeList
      },
      {
        path: '/knowledge/detail/:id/:type',
        name: '知识列表',
        component: KnowledgeDetail
      },
      {
        path: '/knowledge/type/list',
        name: '知识类型',
        component: KnowledgeTypeList
      },
      {
        path: '/knowledge/type/detail/:id/:type',
        name: '知识类型',
        component: KnowledgeTypeDetail
      },
      {
        path: '/knowledge/interactions/list',
        name: '知识互动列表',
        component: KnowledgeInteractionsList
      },
      {
        path: '/knowledge/interactions/detail/:id/:type',
        name: '知识互动列表',
        component: KnowledgeInteractionsDetail
      },
      {
        path: '/knowledge/comment/list',
        name: '知识留言列表',
        component: KnowledgeCommentList
      },
      {
        path: '/knowledge/comment/detail/:id/:type',
        name: '知识留言列表',
        component: KnowledgeCommentDetail
      },
      {
        path: '/news/list',
        name: '公告管理',
        component: NewsList
      },
      {
        path: '/news/detail/:id/:type',
        name: '公告管理',
        component: NewsDetail
      },

      {
        path: '/news/type',
        name: '公告类型',
        component: NewsTypeList
      },
      {
        path: '/news/type/detail/:id/:type',
        name: '公告类型',
        component: NewsTypeDetail
      },
      {
        path: '/carousel/list',
        name: '轮播图信息',
        component: CarouselList
      },
      {
        path: '/carousel/detail/:id/:type',
        name: '轮播图信息',
        component: CarouselDetail
      },

      {
        path: '/feedback/list',
        name: '问题反馈信息',
        component: FeedbackList
      },
      {
        path: '/feedback/detail/:id/:userId/:type',
        name: '问题反馈信息',
        component: FeedbackDetail
      },
      {
        path: '/feedback/add',
        name: '问题反馈信息',
        component: FeedbackAdd
      },
      {
        path: '/feedback/feedback-type/list',
        name: '问题反馈类型',
        component: FeedbackTypeList
      },
      {
        path: '/feedback/feedback-type/detail/:id/:type',
        name: '问题反馈类型',
        component: FeedbackTypeDetail
      },
      {
        path: '/feedback/account-question-type/list',
        name: '账号问题类型',
        component: FeedbackQuestionTypeList
      },
      {
        path: '/feedback/account-question-type/detail/:id/:type',
        name: '账号问题类型',
        component: FeedbackQuestionTypeDetail
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
  routes // （缩写）相当于 routes: routes
})

export default router;
