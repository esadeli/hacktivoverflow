import Vue from 'vue'
import Router from 'vue-router'
// import Home from './views/Home.vue'
import Topic from './views/Topic.vue'
import Alltopics from './views/Alltopics.vue'
import Detailtopic from './views/Detailtopic.vue'
import Addtopic from './views/Addtopic.vue'
import Edittopic from './views/Edittopic.vue'
Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Topic,
      redirect: '/topic'
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/topic',
      name: 'Topic',
      component: Topic,
      children: [{
        path: '/',
        name: 'Alltopics',
        component: Alltopics
      },
      {
        path: '/add',
        name: 'Addtopic',
        component: Addtopic
      },
      {
        path: ':id',
        name: 'id',
        component: Detailtopic,
        props: true
      },
      {
        path: 'edit/:id',
        name: 'Edittopic',
        component: Edittopic,
        props: true
      }]
    }
  ]
})
