import Vue from 'vue'
import Router from 'vue-router'
import Test from '../components/Test'
import Login from '../components/Login'
Vue.use(Router)
const routepush = Router.prototype.push

Router.prototype.push = function(path){
    return routepush.call(this,path).catch(err=>{});
}
export default new Router({
  routes: [
    {
      path: '/',
      name: 'Test',
      component: Test
    },{
      path: '/Login',
      name: 'Login',
      component:Login,
      children: [
              {
                  path: '/admins',
                  name: 'admins',
                  component: () => import('../components/admins')
              }
          ]
      }
  ]
})
