<template>
  <div id="app">
      <layout></layout>
  </div>
</template>


<script>
  import layout from "./views/layout.vue"
  export default {
  
    components:{

      layout

    },

    data(){

        return {
          isSidebar:true
        }

    },

    methods:{

      sidebar_change(){

        this.isSidebar=!this.isSidebar;

      }

    },

  }

</script>


<style lang="less">
html,body,#app{
  width: 100%;
  height:100%;
  overflow: hidden;
}
#app{
  position: relative;
}
</style>
