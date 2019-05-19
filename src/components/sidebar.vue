<template>
    <nav class="sidebar">
        <el-menu :collapse="iscollapse" :default-active="routeActive"  class="sidebar-menu" :router="true">
            <el-menu-item index="1" :route="{name:'index'}"><i class="el-icon-statistics-home"></i><span slot="title">系统首页</span></el-menu-item>
            <el-submenu index="2">
                <template slot="title">
                <i class="el-icon-statistics-caidan"></i>
                <span slot="title">留言项目</span>
                </template>
                <el-menu-item :index="'2-'+index" :route="{name:'detail',query:{id:item.id,name:item.name}}" v-for="(item,index) in typeList" :key="index">
                    <i class="iconfont iconhome"></i>
                    <span slot="title">{{item.name}}</span>
                </el-menu-item>
            </el-submenu>
        </el-menu>
    </nav>
</template>

<script>
export default {
    
    props:{
        iscollapse:{
            type:Boolean,
            default:true
        }
    },

    data(){

        return {

            typeList:[
                {name:"降价通知",id:'1'},
                {name:"定制楼盘",id:'2'},
                {name:"房价趋势",id:'3'},
                {name:"帮您找房",id:'4'},
                {name:"获取楼层特价",id:'5'},
                {name:"获取优惠",id:'6'},
                {name:"获取特价户型",id:'7'},
                {name:"楼盘动态",id:'8'},
                {name:"视频看房",id:'9'},
                {name:"预约看房",id:'10'},
                {name:"开盘通知",id:'11'},
                {name:"组队砍价",id:'12'},
                {name:"获取地址",id:'13'},

            ],

        }

    },

    computed:{

        routeActive(){
            
            return !!parseInt(this.$route.query.id) ? '2-'+(this.$route.query.id-1) : '1'

        }

    }


}
</script>

<style scoped lang="less">
.sidebar{
    display: block;
    position: absolute;
    top:70px;
    left:0;
    bottom:0;
    overflow-y: scroll;
    &::-webkit-scrollbar{
        width: 0;
    }
}
.sidebar-menu:not(.el-menu--collapse) {
    width: 200px;
    min-height: 100%;
}
.el-menu--collapse{
    height:100%;
}
.u-link{
    display: block;
    width: 100%;
    height:100%;
}
</style>
