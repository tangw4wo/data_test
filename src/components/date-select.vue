<template>
    <el-row class="date-select-wrap">
         <el-button :class="{'date-active':date==1}" value="1" @click="dateChange(1)">本日</el-button>
         <el-button :class="{'date-active':date==2}" @click="dateChange(2)">最近三日</el-button>
         <el-button :class="{'date-active':date==3}" @click="dateChange(3)">最近七日</el-button>
         <el-button :class="{'date-active':date==4}" @click="dateChange(4)">最近一个月</el-button>
         <el-date-picker
            type="daterange"
            align="right"
            unlink-panels
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            v-model="dateValue"
            class="date-tpl"
            @change="dateSelect"
            value-format="yyyy-MM-dd"
            >
        </el-date-picker>
        <div class="cover fr" v-if="typeShow">
            <el-radio-group v-model="radio" @change="radioChange">
                <el-radio-button label="3">全部</el-radio-button>
                <el-radio-button label="1">pc端</el-radio-button>
                <el-radio-button label="2">移动端</el-radio-button>
            </el-radio-group>
        </div>
    </el-row>
</template>

<script>
export default {
    props:{
        typeShow:{
            type:Boolean,
            default:true
        }
    },
    data(){
        return {

            radio:'3',
            date:1,
            dateValue:''
        }
    },
    methods:{

        radioChange(){

            this.$emit('radioChange',this.radio);

        },

        dateChange(type,date){

            if(type == this.date && type !=0 ) return false;

            var isDate = {type:type}

            type == 0 && !!date ? isDate.date=date : null; 

            this.date = type;

            this.dateValue = type == 0 ? this.dateValue : '';

            this.$emit('dateChange',isDate);

            this.$eventBus.$emit('contrastChange',this.date);

        },


        dateSelect(date){

           this.dateChange(0,date);
            
        }


    }

}
</script>

<style lang="less" scoped>

    .date-select-wrap{
        padding:10px;

        .date-active{
            color:#fff;
            background-color:#00a0e4;
        }
        .date-tpl{
            margin-left:10px;
        }
        
    }

    .el-radio-button:focus:not(.is-focus):not(:active):not(.is-disabled){
            box-shadow: 0 0 0 0 #fff;
    }

</style>
