<template>
        <div class="select">
            <md-popup
                v-model="show"
                position="top"
                >
                <div class="select-wrap">
                    <div class="select-cover">
                        <div class="button-cover">
                        <div class="button-list">
                            <div class="select-option" :class="{active:index==1}" @click="itemSelect(1)">本日</div>
                            <div class="select-option" :class="{active:index==2}" @click="itemSelect(2)">最近三日</div>
                            <div class="select-option" :class="{active:index==3}" @click="itemSelect(3)">最近七日</div>
                            <div class="select-option" :class="{active:index==4}" @click="itemSelect(4)">最近一个月</div>
                        </div>
                        </div>
                        <div class="date-cover">
                            <div class="start item" @click="onShowPicker(1)">{{dateStart || '请选择开始时间'}}</div>
                            <div class="end item" @click="onShowPicker(2)">{{dateEnd || '请选择结束时间'}}</div>
                        </div>
                        <div class="item-cover">
                            <h4>留言项目</h4>
                            <ul>
                                <li v-for="(item,index) in list" :key="index">
                                    <router-link :class="{active:$route.query.id==(index+1)}" :to="{name:'m_detail',query:{id:item.id,name:item.name}}">{{item.name}}</router-link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <i class="more el-icon-statistics-zelv-gongyong-gengduo open" :class="{open:dateSelectShow}" @click="ondateSelectShow"></i>
                </div>
            </md-popup>
            <md-date-picker
                ref="datePicker"
                today-text="今天"
                v-model="datePickerShow"
                :default-date="currentDate"
                @confirm="getDate"></md-date-picker>
        </div>
</template>

<script>
import {DatePicker} from 'mand-mobile';
import { Popup, PopupTitleBar } from 'mand-mobile'
import collapse from "../utils/collapse.js"
export default {

    components: {
        [DatePicker.name]: DatePicker,
        collapse,
        [Popup.name]:Popup,
        [PopupTitleBar.name]:PopupTitleBar
    },
    props:{
        show:{
            type:Boolean,
            default:false
        }
    },
    data(){

        return {
            index:1,
            dateSelectIndex:1,
            minDate: new Date('2000/1/1'),
            maxDate: new Date(),
            currentDate: new Date(),
            dateSelectShow:false,
            datePickerShow:false,
            dateStart:null,
            dateEnd:null,
            list:[   {name:"降价通知",id:'1'},
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
                {name:"获取地址",id:'13'},]
        }

    },
    methods:{
        itemSelect(index){
            this.index=index;
        },
        getDate(){
            let nowDate = this.$refs.datePicker.getFormatDate('yyyy-MM-dd');

            if(this.dateSelectIndex==1){

                let check = new Date(nowDate);

                console.log(check);

            }
        },
        ondateSelectShow(){
            this.$emit('selectHide');
        },
        onShowPicker(index){
            this.dateSelectIndex=index;
            this.datePickerShow=true;
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
    .select{
        position: relative;
        z-index:1000;
        .md-popup{
            top:1.3333rem;
        }
    }
        .md-popup.top .md-popup-box{
            box-shadow: 0 5px 16px 0 rgba(0, 0, 0, .16);
        }
    .select-wrap{
        .rem-III(padding,10px,10px,10px);
        position: relative;
        transform: translate3d(0,0,0);
        z-index:1000;
        .rem(max-height,350px);
        background-color:#fff;
    }
    .button-cover{
        .button-list{
            display: flex;
            justify-content: space-between;
        }
        .select-option{
            .rem(font-size,14px);
            .rem(padding,10px);
            border:1px solid #ddd;
            border-radius:5px;
            
            &.active{
                background-color:#00a0e4;
                color:#fff;
            }
        }
    }
    .date-cover{
        display: flex;
        .rem-II(padding,10px,0);
        justify-content: space-between;
        .item{
            width: 48%;
            .rem(height,40px);
            .rem(line-height,40px);
            border:1px solid #ccc;
            border-radius:8px;
            text-align: center;
            .rem(font-size,14px);
            color:#999999;
        }
    }

    .item-cover{
        .rem-II(padding,10px,0);
        h4{
            .rem(font-size,18px);
        }
        ul{
            .rem-II(padding,10px,0);
            font-size:0;
            li{
                .rem(margin-bottom,10px);
                display: inline-block;
                vertical-align:middle;
                .rem(margin-right,10px);
            }
        }
        li a{
            display: block;
            .rem-II(padding,5px,10px);
            border:1px solid #ddd;
            border-radius:10px;
            color:#333333;
            .rem(font-size,14px);
            &.active{
                border-color:#00a0e4;
                background-color:#00a0e4;
                color:#FFF;
            }
        }
    }
    
    .more{
        display: block;
        width: 100%;
        .rem(height,30px);
        .rem(line-height,30px);
        text-align: center;
        .rem(font-size,14px);
        .rem(bottom,0);
        left:0;
        transform: translate3d(0,0,0) rotate(180deg);
        animation: arrow 2s infinite;
        &.open{
            transform: translate3d(0,0,0) ;
            animation: arrow-up 2s infinite;
        }
    }

    @keyframes arrow {
        0%{
            transform: translate3d(0,0,0);
        }
        50%{
            transform: translate3d(0,5px,0);
        }
        100%{
            transform: translate3d(0,0,0);
        }

    }
    @keyframes arrow-up {
        0%{
            transform: translate3d(0,0,0) rotate(180deg);
        }
        50%{
            transform: translate3d(0,5px,0) rotate(180deg);
        }
        100%{
            transform: translate3d(0,0,0) rotate(180deg);
        }

    }
    
</style>
