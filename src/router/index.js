import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import pageComponent from '../pages/pageComponent'
import 'bpmn-js-properties-panel/dist/assets/bpmn-js-properties-panel.css'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/bpmnTest',
      name: 'bpmnTest',
      component: pageComponent
    }
  ]
})
