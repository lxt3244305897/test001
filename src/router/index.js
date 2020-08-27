import Vue from 'vue'
import Router from 'vue-router'
import Test from '../components/Test'
import Home from '../components/Home'
import Login from '../components/Login'
import rommtype from '../components/rommtype'
import bnbinfo from '../components/bnbinfo'
Vue.use(Router)
const routepush = Router.prototype.push

Router.prototype.push = function (path) {
  return routepush.call(this, path).catch(err => {})
}
export default new Router({
  routes: [
    {
      path: '/',
      name: 'Test',
      component: Test
    }, {
      path: '/Home',
      name: 'Home',
      component: Home
    }, {
      path: '/Login',
      name: 'Login',
      component: Login
    }, {
      path: '/rommtype',
      name: 'rommtype',
      component: rommtype
    }, {
      path: '/bnbinfo',
      name: 'bnbinfo',
      component: bnbinfo
    }
  ]
})
