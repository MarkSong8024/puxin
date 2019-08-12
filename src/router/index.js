import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/study_center/my_course'
    },
    {
      path: '/login',
      name: 'index',
      component: () => import('view/login')
    },
    {
      path: '/study_center',
      name: 'main',
      component: () => import('view/study-center/Main'),
      redirect: '/study_center/my_course',
      children: [
        { // 我的课程
          path: '/study_center/my_course',
          name: 'my_course',
          component: () => import('view/study-center/MyCourse'),
          meta: {
            id: 2
          }
        },
        { // 课程详情
          path: '/study_center/my_course_detail',
          name: 'my_course_detail',
          component: () => import('view/study-center/MyCourseDetail'),
          meta: {
            id: 2
          }
        },
        { // 我的公开课
          path: '/study_center/my_public_class',
          name: 'my_public_class',
          component: () => import('view/study-center/MyPublicClass'),
          meta: {
            id: 3
          }
        },
        {
          path: '/live/main',
          name: 'live_calss',
          component: () => import('view/live/main')
        }
      ]
    },
    {
      path: '/play_back',
      name: 'play_back',
      meta: {
        requireAuth: true, //是否登录后才能访问
        aliasName: '我的课程看回放'
      },
      component: () => import('@/components/palyback/seehf.vue')
    },
    {
      path: '*',
      redirect: '/study_center/my_course'
    }
  ]
})
