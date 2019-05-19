import Vue from "vue";
import Router from "vue-router";
import index from "./views/index.vue";
import Detail from "./views/detail.vue";
import content from "./views/content.vue";
import layout from "./views/layout.vue";
import m_content from "./views/m_content.vue";
import m_index from "./views/m_index.vue";
import m_detail from "./views/m_detail.vue"
Vue.use(Router);

export default new Router({
  base: '/index.php?c=statistics&a=index',
  // mode:'history',
  routes: [
    {
      path:'/',
      component:layout,
      redirect:{name:'wap'}
    },{
      path:'/content',
      name:'pc',
      component:content,
      redirect:{name:'index'},
      children:[
          {
            path:'index',
            name:'index',
            component:index,
          },
          {
            path:'detail',
            name:'detail',
            component:Detail,
          }

      ]

    },{
      path:'/m_content',
      name:'wap',
      component:m_content,
      redirect:{name:'m_index'},
      children:[
        {
          path:'m_index',
          name:'m_index',
          component:m_index
        },
        {
          path:'/m_detail',
          name:'m_detail',
          component:m_detail
        }
      ]
    }
  ]
});
