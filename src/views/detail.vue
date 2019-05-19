<template>
    <div class="wrap">
        <transition name="fade">
            <div class="change-cover" v-if="!!data">
                <div class="top">
                <date-select :typeShow="false" @dateChange="dateChange"></date-select>
                <el-row class="top-item">
                    <el-col :span="11" class="m-el-cover">
                        <el-card :body-style="{padding:0}" shadow="hover">
                            <div class="cover">
                                <h4 class="title"><p>基本信息</p></h4>
                                <div class="ctn">
                                    <p class="item-name">入口名称：{{$route.query.name}}</p>
                                    <p class="max text-item"><span>峰值为：{{data.max.value || '暂无'}}</span><span>发生在&nbsp;{{data.max.date || '暂无'}}</span></p>
                                    <p class="min text-item"><span>最低值为：{{data.min.value || '暂无'}}</span><span>发生在&nbsp;{{data.min.date || '暂无'}}</span></p>
                                    <p class="average text-item"><span>平均值为：{{average}}（统计以来）</span></p>
                                    <p class="increase text-item" :class="numChange"><span>比较上个月：{{data.change}}%<i class="icon"
                                    :class="{'el-icon-statistics-shangjiantou':numChange=='up','el-icon-statistics-xiajiantou':numChange=='down'}"
                                    ></i></span></p>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :span="13" class="m-el-cover">
                        <el-row class="r-top-cover m-el-m-cover">
                            <el-col :span="8" class="top-card">
                                <el-card :body-style="{padding:0}" shadow="hover">
                                    <div class="sm-cover">
                                        <i class="b-icon el-icon-statistics-liuyan color-004"></i>
                                        <div class="des">
                                            <p class="num">{{data.all}}</p>
                                            <p class="tips">留言总数</p>
                                        </div>
                                    </div>
                                </el-card>
                            </el-col>
                            <el-col :span="8" class="top-card">
                                <el-card :body-style="{padding:0}" shadow="hover">
                                    <div class="sm-cover">
                                        <i class="b-icon el-icon-statistics-paihang color-yellow"></i>
                                        <div class="des">
                                            <p class="num">{{data.rank}}</p>
                                            <p class="tips">排名</p>
                                        </div>
                                    </div>
                                </el-card>
                            </el-col>
                            <el-col :span="8" class="top-card">
                                <el-card :body-style="{padding:0}" shadow="hover">
                                    <div class="sm-cover">
                                        <i class="b-icon" :class="{
                                            'el-icon-statistics-xiajiantou':rankingChange=='down',
                                            'el-icon-statistics-shangjiantou':rankingChange=='up',
                                            'color-up':rankingChange=='up',
                                            'color-down':rankingChange=='down'
                                            }"></i>
                                        <div class="des">
                                            <p class="num" :class="rankingChange">{{data.rankingChange}}</p>
                                            <p class="tips">排名变化</p>
                                        </div>
                                    </div>
                                </el-card>
                            </el-col>
                        </el-row>
                        <el-row class="m-el-m-cover r-bottom-cover">
                            <el-col class="u-el-cover">
                                <el-card :body-style="{padding:0}" shadow="hover">
                                    <div ref="bar" class="cover"></div>
                                </el-card>
                            </el-col>
                        </el-row>
                    </el-col>
                </el-row>
            </div>
            <div class="bottom">
                <el-row class="bottom-cover">
                    <line-charts heightClass="detail-line" :data="line"></line-charts>
                </el-row>
            </div>
            </div>
        </transition>
        <loading :show="!data"></loading>
    </div>
</template>

<script>
import dateSelect from "../components/date-select";
import lineCharts from "../components/line-chart";
import loading from "../components/loading";
import { setTimeout } from 'timers';
export default {
    components:{
        dateSelect,
        lineCharts,
        loading
    },
    data(){
        return{
            data:null,
            bar:null,
            line:null,
            type:1
        }
    },
    computed:{
        numChange(){

            if(!this.data.change || this.data.change==0){
                return '';
            }

            if(this.data.change < 0){

                return 'down';
            }

            if(this.data.change >0){

                return 'up';

            }

        },
        rankingChange(){

            if(!this.data.rankingChange || this.data.rankingChange == 0 ){

                return '';

            }

            if(this.data.rankingChange <0){

                return 'down';

            }

            if(this.data.rankingChange >0){

                return 'up';

            }


        },

        average(){

            return parseInt(this.data.average);

        }
    },
    methods:{
        /**获取单页面数据方法 */
        getData(){
             this.$axios.get('/api/index.php?c=content&a=get_rukou_record',{
                params:{
                    typeid:this.$route.query.id,
                    type:this.type

                }
             }).then((res)=>{
                this.data = res.data;
                this.line= this.data.lineData;
                console.log(this.data);
                //处理柱状图对象

            })
        },
        /**柱形图初始化方法 */
        setBar(){
            this.bar = this.$echarts.init(this.$refs.bar);
            let xAxisData = [];
            let data=[];
            this.data.barData.forEach(element => {
                xAxisData.push(element.date);
                data.push(element.value);
            });
            console.log(xAxisData,data);
            let option = {
                title: {
                    text: '项目总数对比(按月份)'
                },
                toolbox: {
                    feature: {
                        saveAsImage: {
                            pixelRatio: 2
                        }
                    }
                }, 
                tooltip: {},
                grid:{
                    x:50,
                    x2:50,
                    y2:30
                },
                xAxis: {
                    data: xAxisData,
                    silent: false,
                    splitLine: {
                        show: false
                    }
                },
                yAxis: {},
                series: [{
                    name: '留言总数',
                    type: 'bar',
                    data: data,
                    animationDelay: function (idx) {
                        return idx * 10;
                    },
                    markLine:{
                        itemStyle : {
                            normal : {
                            color:'#1e90ff',
                            label : {
                                show:true
                            }
                            }
                        },
                        data : [{type : 'average', name: '平均值'}]
                    },
                    markPoint:{
                            data: [
                                {
                                    name: '最大值',
                                    type: 'max'
                                },
                                {
                                    name:"最小值",
                                    type:'min'
                                }
                            ]
                    }
                }],
                animationEasing: 'elasticOut',
                animationDelayUpdate: function (idx) {
                    return idx * 5;
                }
            };  
            this.bar.setOption(option)
            window.addEventListener('resize', this.bar.resize);
        },

        /**时间区间切换方法 */
        dateChange(data){
            console.log('执行了');
        }

    },
    mounted(){
        //获取数据
        this.getData();
    },
    watch:{
        data(val,oldval){
            //异步执行
            setTimeout(()=>{
                this.setBar();
            },0)
        }
    }
}
</script>

<style lang="less" scoped>
    .wrap{
        width: 100%;
        height:100%;
        background-color:#f0f0f0;
        overflow: auto;
        .top{
            .cover{     
                    height:400px;
                    .title{
                        font-size:20px;
                        line-height: 40px;
                        border-left:5px solid #00affa;
                        padding: 0 10px;
                        margin-bottom:20px;
                        position: relative;
                        box-sizing: border-box;
                        p{
                            border-bottom:1px solid #f5f5f5;
                        }
                        &:after{
                            position: absolute;
                        }
                    }

                    .ctn{
                        padding:10px;
                    }
                    .item-name{
                        font-size:20px;
                        padding:0 5px;
                        color:#00a0e4;
                        font-weight: bold;
                    }

                    .text-item{
                        width: 100%;
                        padding:20px 5px 0;
                        box-sizing: border-box;
                        font-size:16px;
                        line-height: 26px;
                        color:#777;
                        &.up{
                            color:rgb(11, 218, 11);
                        }
                        &.down{
                            color:rgb(255, 68, 68);
                        }
                        span{
                            display: inline-block;
                            width: 50%;
                            &:nth-child(2){
                                text-align: left;
                            }
                        }

                        &.average{
                            span{
                                width: 100%;
                            }
                        }
                    }
            }
            .sm-cover{
                display: flex;
                align-items: center;
                .des{
                    flex:1;
                    .num{
                        font-size:30px;
                        font-weight: bold;
                        text-align: center;
                        line-height: 40px;
            
                    }
                    .tips{
                        font-size:14px;
                        color:#999;
                        text-align: center;
                        line-height: 20px;
                    }
                }

                .b-icon{

                    background-color:#F5F5F5;

                    
                    &.color-yellow{

                        background-color:rgb(255, 208, 0);
                        
                    }   

                    &.color-down{
                        
                        background-color:rgb(255, 15, 15);

                    }

                    &.color-up{
                        background-color:rgb(11, 218, 11);
                    }

                    &.color-none{
                        background-color:#f5f5f5;
                    }
                    &.color-004{

                        background-color:#00a0e4;

                    }

                }
            }
            .top-card{
                 padding: 0 10px;
                &:first-child{
                    .num{color:#00a0e4}
                }
                &:nth-child(2) .num{color:rgb(255, 208, 0);}
                &:nth-child(3) .num{
                    color:#999999;
                    &.down{
                        color:rgb(255, 15, 15);
                    }
                    &.up{
                        color:rgb(11, 218, 11);
                    }
                }
            }
            .r-bottom-cover{
                .u-el-cover{
                    padding:10px 10px 0;
                     .cover{
                            height:288px;
                            padding:10px;
                            box-sizing: border-box;
                    }
                }
            } 
           
        }

    }

    
    .fade-enter-active, .fade-leave-active {
        transition: opacity 1s;
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
        opacity: 0;
    }


    @media screen and (max-width:1440px) {
        .wrap .top .r-bottom-cover .u-el-cover .cover{
            height:308px;
        }
    }
</style>
