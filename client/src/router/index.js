import Vue from 'vue'
import Router from 'vue-router'
import LogIn_SignUp from '@/components/LogIn_SignUp'
import Main from '@/components/Main'
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
    }
  ]
})
