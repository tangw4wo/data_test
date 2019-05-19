<template>
    <el-col class="pie-wrap m-el-cover" :span="size">
        <div class="pie-cover el-module">
            <div class="chart-cover" v-show="!!data">
                <div ref="pie" class="pie-cover"></div>
            </div>
        </div>
    </el-col>
</template>

<script>
export default {

  props:{

    size:{
        type:Number,
        default:0
    },

    data:{
        type:Array,
        default:{}
    }

  }
  ,

  data () {

    return {
        
    typeData:null,

    typeNameList:[],

    pie:''

    }

  },

 methods:{

     sizeFun(pie){

        pie.resize();

     },

    chratInit(data,callback){

        this.pie = this.$echarts.init(this.$refs.pie) ;

        if(!data) return false;
        
        this.typeNameList = [];

        data.forEach(el => {

            this.typeNameList.push(el.name);

        })



        let options = {
            
            title : {
                text: '留言入口分布占比',
                x:'center'
            },
            tooltip : {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
                type: 'scroll',
                top:'bottom',
                left: 'left',
                data: this.typeNameList
            },
            series : [
                {
                    name: '留言来源',
                    type: 'pie',
                    radius : '65%',
                    center: ['50%', '50%'],
                    data:data,
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        }

        this.pie.setOption(options);

        callback && callback();

    },

    chratReset(data){

         if(!data) return false;
        
        this.typeNameList = [];

        data.forEach(el => {

            this.typeNameList.push(el.name);

        })

    }


 },

 watch:{

     data(val,oldval){

         setTimeout(()=>{
             this.chratInit(val);   
         },0)

     }

 },
 
 mounted(){

     if(!this.data) return false;

     setTimeout(()=>{

        this.chratInit(this.data,()=>{

            window.addEventListener('resize', this.pie.resize)

        });
        
     })

 }

}
</script>

<style lang="less" scoped>
.pie-wrap{
    .pie-cover{
        background: #fff;
        padding: 10px;
        height:100%;
        box-sizing: border-box;
    }
    .title{
        font-size:22px;
        line-height: 40px;
        border-bottom:1px solid #eee;
    }
    .chart-cover{
        height:100%;
      
    }
    .pie-cover{
        width: 100%;
        height:100%;
        text-align: center;
    }
}

</style>
