<template>
    <div class="content">
        <u-header  @sidebar-flod="sideBarChange"></u-header>
        <sideBar :iscollapse="sideBarShow"></sideBar>
        <div class="cover" :class="{'content-unfold':!sideBarShow}">
            <router-view :key="dateKey" class="route-view"></router-view>
        </div>
    </div>
</template>

<script>
import header from '../components/header';
import sideBar from "../components/sidebar";
export default {

     components:{
        uHeader:header,
        sideBar
    },

    data(){

        return {

            sideBarShow:true

        }

    },

    computed:{
        dateKey(){

            return this.$route.query.id || 0;

        }
    },


    methods:{

        sideBarChange(){

            this.sideBarShow=!this.sideBarShow;

        }

    }
    

}
</script>

<style lang="less" scoped>
.content{
    width: 100%;
    height:100%;
  .cover{
    position: absolute;
    left:65px;
    right:0;
    top:70px;
    bottom:0;
    transition: left .3s ease-in-out;
    &.content-unfold{
        left:200px;
    }
  }
}
</style>
