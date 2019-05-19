<template>
    <div class="wrap">
        <!-- 类别切换 -->
        <div class="type-change">
            <div class="change-btn" :class="{active:typeIndex==3}" @click="typeChange(3)">全部</div>
            <div class="change-btn" :class="{active:typeIndex==1}" @click="typeChange(1)">pc端</div>
            <div class="change-btn" :class="{active:typeIndex==2}" @click="typeChange(2)">移动端</div>
        </div>
        <md-swiper
        :default-index="0"
        :dragable="true"
        :is-loop="false"
        :has-dots="false"
        transition="slideY">
        <!-- 详细信息 -->
        <md-swiper-item>
            <div class="cover">
                <h5 class="title"><div class="left"></div><div class="ctn">数据详情</div></h5>
            </div>
        </md-swiper-item>
        <!-- 饼图 -->
        <md-swiper-item>
            <a href="javascript:" :style="{height:sreenHeight+'rem'}">饼图</a>
        </md-swiper-item>
        <!-- 排行榜 -->
        <md-swiper-item>
            <a href="javascript:" :style="{height:sreenHeight+'rem'}">排行榜</a>
        </md-swiper-item>
        <!-- 折线图 -->
        <md-swiper-item>
            <a href="javascript:" :style="{height:sreenHeight+'rem'}">折线图</a>
        </md-swiper-item>
        </md-swiper>
    </div>
</template>

<script>
import { Swiper, SwiperItem } from 'mand-mobile'
export default {
    components:{
        [Swiper.name]:Swiper,
        [SwiperItem.name]:SwiperItem
    },
    data(){
        return {

            data:['饼图','内容','折线图','排行'],
            sreenHeight:0,
            typeIndex:1

        }
    },

    methods:{

        //类型切换
        typeChange(index){
            if(index == this.typeIndex) return false;
            this.typeIndex=index;

        }

    },

    created(){
        this.sreenHeight =(window.screen.height / 37.5 - 100/37.5).toFixed(2);
    }
}
</script>

<style lang="less" scoped>
    //封装rem换算公式,@name-属性名称，@px 设计图的px尺寸
    @color:#00a0e4;
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
    .type-change{
        text-align: center;
        font-size:0;
        .rem-II(padding,10px,0);
        .change-btn{
            display: inline-block;
            .rem(width,100px);
            .rem(font-size,14px);
            .rem(height,35px);
            .rem(line-height,35px);
            border:1px solid #ccc;
            overflow: hidden;
            &:first-child{
                border-top-left-radius: 40px;
                border-bottom-left-radius: 40px;
            }
            &:nth-child(2){
                border-left:0;
                border-right:0;
            }
            &:nth-child(3){
                border-top-right-radius: 40px;
                border-bottom-right-radius: 40px;
            }

            &.active{
                background-color:#00a0e4;
                color:#fff;
                border-color:#00a0e4;
            }
        }
    }
    a{
        display: block;
    }

    .cover{

        .title{
            .left{
                .rem(width,40px);
                .rem(height,40px);
                position: relative;           
                background: linear-gradient(left,@color,#007db3);
                display: inline-block;
                vertical-align: top;
                &:after{
                    content: '';
                    width: 0;
                    height:0;
                    position:absolute;
                    .rem(top,40px);
                    .rem-IV(border-width,20px,40px,0,0);
                    border-color:@color transparent transparent transparent;
                    border-style: solid;
                    background: linear-gradient(left, @color , #007db3);
                }
           }

           .ctn{
                display: inline-block;
                background: linear-gradient(right, @color , #007db3);
                vertical-align: top;
                .rem(width,200px);
                .rem(height,40px);
                .rem(line-height,40px);
                .rem(font-size,18px);
                color:#fff;
                text-align: center;
           }
        }
    }
</style>
