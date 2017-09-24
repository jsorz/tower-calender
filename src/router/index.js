import Vue from 'vue'
import Router from 'vue-router'
import Demo from '@/pages/demo'
import Calendar from '@/pages/calendar'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/demo',
      name: 'Demo',
      component: Demo
    },
    {
      path: '/calendar',
      name: 'Calendar',
      component: Calendar
    }
  ]
})
