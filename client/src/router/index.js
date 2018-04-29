import Vue from 'vue'
import Router from 'vue-router'
import LogIn_SignUp from '@/components/LogIn_SignUp'
import Main from '@/components/Main'
import adminLogin from '@/components/adminLogin'
import adminMain from '@/components/adminMain'
import Profile  from '@/components/Profile/Profile'
import Test from '@/components/Test'
import Chatroom from '@/components/chatroom'
import Guest from '@/components/Guest'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'LogIn_SignUp',
      component: LogIn_SignUp
    },
    {
      path: '/main',
      name: 'Main',
      component: Main
    },
    {
      path: '/user/profile',
      name: 'Profile',
      component: Profile
    },
    {
      path: '/adminLogin',
      name: 'adminLogin',
      component: adminLogin
    },
    {
      path: '/adminMain',
      name: 'adminMain',
      component: adminMain
    },
    {
      path: '/chatroom',
      name: 'Chatroom',
      component: Chatroom
    },
    {
      path: '/guest',
      name: 'Guest',
      component: Guest
    }
  ]
})
