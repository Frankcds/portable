import Vue from 'vue'
import Router from 'vue-router'
// import upperLimit from '@/components/upperLimit'
import Receive from '@/components/Receive'
import Successful from '@/components/Successful'
import upperLimit from '@/components/upperLimit'
import Fail from '@/components/Fail'


Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Receive',
      component: Receive
    },
    {
    	path: '/Successful',
    	name: 'Successful',
    	component: Successful
    },
    {
      path: '/upperLimit',
      name: 'upperLimit',
      component: upperLimit
    },
    {
      path:'/Fail',
      name:'Fail',
      component:Fail
    }
  ]
})
