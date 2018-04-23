import Vue from 'vue'
import Router from 'vue-router'
import LogIn_SignUp from '@/components/LogIn_SignUp'
import Main from '@/components/Main'
import Profile  from '@/components/Profile/Profile'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'LogIn_SignUp',
      component: LogIn_SignUp
    },
    {
      path: '/user',
      name: 'Main',
      component: Main
    },
    {
      path: '/user/profile',
      name: 'Profile',
      component: Profile
    }
  ]
})
