<template>
    <div class="index-wrap" 
    v-loading="componentLoading"
    element-loading-text="加载中"
    element-loading-background="rgba(255,255, 255, 0.8)"
    >
        <transition name="fade">
                <div class="index-cover" v-if="!loading">
                    <div class="index-top">
                    <!-- 日期选择开始 -->
                    <date-select @radioChange="getType" @dateChange="getDate"></date-select>
                    <!-- 日期选择结束 -->
                    <!-- 全数据统计开始 -->
                    <el-row class="all-data">
                        <pie :size="11" :data="!!msgData && msgData[dataType] ? msgData[dataType] : null"></pie>
                        <info :size="13" :data="!!Special_data && Special_data[dataType] ? Special_data[dataType] : null" :phData="rankData" :type="dateType"></info>
                    </el-row>
                <!--  全数据统计结束 -->
                    </div>
                    <div class="index-bottom">
                        <!-- 排行前三的入口折线图开始 -->
                        <line-chart :data="lineData"></line-chart>
                        <!-- 排行前三的入口折线图结束 -->
                    </div>
                </div>
        </transition>
        <loading :show="loading"></loading>
    </div>
</template>

<script>

import dateSelect from "../components/date-select";
import pie from "../components/pie";
import info from "../components/info";
import lineChart from "../components/line-chart";
import loading from "../components/loading";
import axios from "axios";
export default {

    components:{
        
        dateSelect:dateSelect,
        
        pie:pie,

        info:info,

        lineChart:lineChart,

        loading:loading

    },

    data(){

        return {

            /**页面数据 */

            msgData:null,

            /**类型序号 1 pc 2 wap 3 all */

            dataType:3,

            /**留言数量数据 */

            Special_data:null,

            /**是否在加载 */

            loading:true,

            /**时间节点类别 1 本日 2 最近三日 3 最近七日 4 最近一个月 */

            dateType:1,

            componentLoading:true,

            /**选择时间区间 */

            dateSection:null,

            /**排行数据 */

            ph_data:null,

            /**请求失败重试次数 */

            retry:2,

            /**失败重试组件实例化,用于关闭组件 */

            msg:null,

            /**折线图数据 */

            lineData:null,
           
        }

    },

    computed:{

        rankData(){

            return !!this.ph_data ?  this.ph_data[this.dataType] :null;
        }

    },

    methods:{
        /**响应日期选择函数 */
        getType(data){

            if(data == this.dataType) return false;

            this.dataType = data;

        },
        /**按钮切换选中 */
        getDate(data){

            if(data.type == 0){

                this.dateType = 0;

                this.dateSection = data.date;

            }else{

                this.dateType = data.type;

                this.dateSection = null;

            }

            this.DateChange();

            this.getPH_data();

        },
        /**时间节点切换请求数据 */
        DateChange(){

            var isParam = {};

            if(this.dateType == 0 && !!this.dateSection){

                isParam.stime = this.dateSection[0];

                isParam.etime = this.dateSection[1];

            }else{

                isParam.type = this.dateType;

            }

            this.componentLoading = this.loading ? false : true;

            axios.all([this.getPieData(isParam),this.getPH_data(isParam)])
            .then((acct,perms)=>{

                    this.msgData = acct[0].data;
                    console.log(this.msgData)
                    this.Special_data = this.$utils.getIntData(acct[0].data);

                    this.ph_data = acct[1].data
                    console.log('我是排行榜内容',this.ph_data)
                     if(this.loading){

                     this.loading=false;

                    }else{

                     this.componentLoading=false;

                    }

                if(!acct[0].data){

                    this.$notify.error({

                    title: '获取统计数据失败',

                    message: '请稍后重试',

                    });

                }

                if(!acct[1].data){

                    this.$notify.error({

                    title: '获取排行数据失败',

                    message: '请稍后重试',

                    });

                }

                
            }).catch((err)=>{
                console.log(err);

                if(err.message.indexOf('timeout') > -1){
                    
                    if(this.retry < 1){

                        if(!!this.msg){

                            this.msg.close();

                        }

                        this.$notify({

                        title: '获取数据失败',

                        dangerouslyUseHTMLString: true,

                        message: '超过重试次数,请稍后再试,或者刷新页面',

                        duration: 0,

                        });

                        return false;

                    }

                    if(!!this.msg){

                        this.msg.close();
                    }

                    this.msg = this.$notify({

                    title: '获取数据超时',

                    message: '点击此处进行刷新',

                    duration: 10000,
                    
                    onClick:this.retry < 1 ? null : this.dataRest

                    });

                    this.retry--;
                }else{
                    this.$notify.error({

                    title: '获取数据失败',

                    message: '请稍后重试',

                    });
                }

                      if(this.loading){

                     this.loading=false;

                    }else{

                     this.componentLoading=false;

                    }
            })

        },

        /**获取饼图数据 */
        getPieData(isParam){

            return this.$axios.get(

            '/api/index.php?c=content&a=getrecord',

                {
                    params: isParam

                }
            )


        },

        /**获取曲线图数据 */

        getLineCharts(){

            this.$axios.get('/api/index.php?c=content&a=get_month_qx_record').then((res)=>{
                
                this.lineData = res.data.data

            })

        },
        /**获取首页排行数据 */
        getPH_data(isParam){

            return this.$axios.get('/api/index.php?c=content&a=get_order_record',
                {
                    params: isParam

                }
            )

        },


        dataRest(){
            /**获取不同时间段数据 */
            this.DateChange();
            /**获取排行数据 */
            this.getPH_data();
        }

    },

    mounted(){
        /**数据初始化 */
        this.dataRest();
        /**获取曲线图数据 */
        this.getLineCharts();
        
    }

}
</script>

<style lang="less" scoped>

    .index-wrap{
        width: 100%;
        height:100%;
        background-color:#f0f0f0;
        box-sizing: border-box;
        overflow: auto;
        padding-bottom:20px;
        .index-cover{
            width: 100%;
            height:100%;
        }
        .all-data{
            height:500px;
        }
    }

    .fade-enter-active, .fade-leave-active {
        transition: opacity 1s;
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
        opacity: 0;
    }

    @media screen and (max-width:1440px) {

        .index-wrap .all-data{
            height:400px;
        }

    }
    
</style>
