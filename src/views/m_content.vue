<template>
    <div class="wrap">
        <div class="top">
            <header class="header">
                <p>房客网数据统计</p>
                <i class="menu el-icon-statistics-menu" @click="menuOpen"></i>
            </header>
            <date-select :show="menuShow" @selectHide="menuOpen"></date-select>
        </div>
        <main class="main">
            <router-view></router-view>
        </main>
    </div>
</template>

<script>
import dateSelect from "../components/mDateSelect"
export default {

    components:{
        dateSelect
    },

    data(){

        return {
            //是否显示菜单
            menuShow:false
            
        }

    },


    methods:{
        menuOpen(){
            if(this.invid){
                clearTimeout(this.invid);
            }
            this.invid=setTimeout(()=>{
                this.menuShow=!this.menuShow;
            },300)

        }
    }

}
</script>

<style lang="less" scoped>
    //封装rem换算公式,@name-属性名称，@px 设计图的px尺寸

    //单属性
    .rem(@name,@px){
    @{name}:unit(round(@px / 37.5,4), rem);
    }
    //双参数属性
    .rem-II(@name,@px,@pxII){
    @{name}:unit(round(@px / 37.5,4), rem) unit(round(@pxII / 37.5,4), rem);
    }

    //三参数属性
    .rem-III(@name,@px,@pxII,@pxIII){
    @{name}:unit(round(@px / 37.5,4), rem) unit(round(@pxII / 37.5,4), rem) unit(round(@pxIII / 37.5,4), rem);
    }

    //完整参数属性
    .rem-IV(@name,@px,@pxII,@pxIII,@pxIV){
    @{name}:unit(round(@px / 37.5,4), rem) unit(round(@pxII / 37.5,4), rem) unit(round(@pxIII / 37.5,4), rem) unit(round(@pxIV / 37.5,4), rem);
    }

    //important专用 

    .rem-ipt(@name,@px){
    @{name}:unit(round(@px / 37.5,4), rem)!important;
    }
    .wrap{
        margin: 0 auto;
        position: relative;
        .top{
            position: absolute;
            top:0;
            left:0;
            right:0;
            z-index:9999;
        }
    }
    .header{
        .rem(height,50px);
        .rem(line-height,50px);
        background-color:#00a0e4;
        color:#ffffff;
        .rem(font-size,18px);
        .rem-II(padding,0,10px);
        display: flex;
        justify-content: space-between;
        position: relative;
        z-index:9999;
        .menu{
            .rem(font-size,24px);
            .rem(line-height,50px);
            .rem-II(padding,0,10px);
        }
    }
    .main{
        position: absolute;
        .rem(top,50px);
        bottom:0;
        width: 100%;
    }
</style>
