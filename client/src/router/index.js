import Vue from 'vue'
import Router from 'vue-router'
import CollegesView from '@/views/CollegesView'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Colleges',
      meta: {
        title: 'NY Colleges'
      },
      component: CollegesView
    }
  ]
})
