<template>
    <el-col :span="size" class="m-el-cover info-wrap">
        <el-row class="top">
            <el-col :span="8" class="item">
                <el-card :body-style="{padding:0}" shadow="hover">
                    <div class="cover">
                        <i class="b-icon el-icon-statistics-liuyan color-004"></i>
                        <div class="des">
                            <p class="num">{{all}}</p>
                            <p class="tips">留言总数</p>
                        </div>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="8" class="item">
                <el-card shadow="hover" :body-style="{padding:0}">
                    <div class="cover">
                        <i class="b-icon el-icon-statistics-huangguan color-yellow"></i>
                        <div class="des">
                            <p class="num" style="color:rgb(255, 208, 0);">{{champion}}</p>
                            <p class="tips">冠军：{{name}}</p>
                        </div>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="8" class="item">
                <el-card shadow="hover" :body-style="{padding:0}">
                    <div class="cover">
                        <i class="b-icon el-icon-statistics-xiajiantou color-down"></i>
                        <div class="des">
                            <p class="num">-6%</p>
                            <p class="tips">相比{{contrast}}下降</p>
                        </div>
                    </div>
                </el-card>
            </el-col>
        </el-row>
        <el-row class="bottom">
            <el-col :span="12" class="m-el-cover">
                <el-card :body-style="{padding:0}" shadow="hover">
                    <div class="cover">
                        <div class="title">增长排名<span>—前八位{{type==0 ?'(最近一个月)' : ''}}</span></div>
                        <ul class="type-list" v-if="!!phData">
                            <li v-for="(item,index) in phData.up" :key="index">
                                <span class="fl">{{item.name}}</span>
                                <span class="fr">{{item.value}}<i class="icon el-icon-statistics-shangjiantou"></i></span>
                            </li>
                        </ul>
                        <div v-if="!phData.up" class="error">暂无对应信息</div>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="12" class="m-el-cover">
                <el-card :body-style="{padding:0}" shadow="hover">
                    <div class="cover">
                        <div class="title">下降排名<span>-前八位{{type==0 ?'(最近一个月)' : ''}}</span></div>
                         <ul class="type-list down" v-if="!!phData">
                            <li v-for="(item,index) in phData.down" :key="index">
                                <span class="fl">{{item.name}}</span>
                                <span class="fr">{{item.value}}<i class="icon el-icon-statistics-xiajiantou"></i></span>
                            </li>
                        </ul>
                        <div v-if="!phData.down" class="error">暂无对应信息</div>
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </el-col>
</template>

<script>
export default {

    props:{
        size:{
            type:Number,
            default:24
        },
        data:{
            type:Object,
            default:()=>({}) 
        },
        phData:{
            type:Object,
            default:()=>({}) 
        },
        type:{
            type:Number,
            default:1
        }
    },

    data(){

        return {

            contrast:'昨日'
            
        }

    },

    computed:{

        all(){

            return !!this.data ? this.data.all : 0

        },

        champion(){

            return !!this.data ? this.data.max.value : 0

        },

        name(){

            return !!this.data ? this.data.max.name : '暂无资料'

        }


    },

    mounted(){

        this.$eventBus.$on('contrastChange',(data)=>{
            
            this.contrast = data == 1 ? '昨日' : data== '2' ? '前三日' : data == '3' ? '前七日' : data== '4' ? '上个月' : '之前'

        })


    }

}
</script>

<style lang="less" scoped>

    .info-wrap{
        

        .top{
            margin:0 -10px;
            .item{
                padding: 0 10px;
            }
            
            .cover{
                font-size:0;
                display: flex;
                align-items: center;
            }

            .des{
                flex:1;
                .num{
                    font-size:30px;
                    font-weight: bold;
                    text-align: center;
                    color:#00affa;
                    line-height: 40px;
     
                }
                .tips{
                    font-size:14px;
                    color:#999;
                    text-align: center;
                    line-height: 20px;
                }
            }
            
        }

        .bottom{
            margin: 0 -10px;
            .cover{
                height:366px;
                box-sizing: border-box;
                display: flex;
                flex-direction: column;
                position: relative;
                .title{
                    font-size:14px;
                    height:28px;
                    line-height: 28px;
                    border-bottom:1px solid #eee;
                    letter-spacing: 1px;
                    padding-left:20px;
                    color:#777;
                    span{
                        vertical-align: bottom;
                    }
                }
                .type-list{
                    flex:1;
                    display: flex;
                    flex-direction: column;
                    box-sizing: border-box;
                    padding:10px 20px;
                    color:#777;

                    li{
                        height:30px;
                        line-height: 30px;
                        font-size:14px;
                        padding-top:9px;
                        position: relative;
                        span:nth-child(2){
                            color:#00a0e4;
                            .icon{
                            font-size:16px;
                            vertical-align: middle;
                            padding-left:10px;
                            display: inline-block;
                            height:22px;
                            }
                        }
                    }

                    &.down li span:nth-child(2){
                            color:rgb(255, 68, 68);
                    }
                }
                .error{
                    position:absolute;
                    left:50%;
                    top:50%;
                    transform: translateX(-50%) translateY(-50%);
                    font-size:14px;
                    color:#999999;
                }
            }
        }


        .color-004{

            background-color:#00a0e4;

        }

        .color-yellow{

            background-color:rgb(255, 208, 0);
            
        }   

        .color-down{

            background-color:rgb(0, 204, 0);

        }

    }

    @media screen and (max-width:1440px){

        .index-wrap .bottom .cover{

            height:286px;

            .title{
                font-size:12px;
            }
            .type-list li {
                height:24px;
                line-height: 24px;
                font-size:12px;
                padding-top:6px;
                span:nth-child(2) .icon{
                    font-size:14px;
                    height:18px;
                }
                
            }
        }

        .info-wrap .top .des{
            .num{

                font-size:26px;

            }
            .tips{  

                font-size:12px;

            }
            

        }

    }


</style>
