<template>
    <div class="loading" v-if="show">
         <div class="_borderWrap">
             <div class="_border">房客网</div>
         </div>
    </div>
</template>

<script>
export default {

    props:{
        show:{
            type:Boolean,
            default:false
        }
    }

}
</script>

<style lang="less" scoped>

     ._borderWrap{
            position: absolute;
            text-align: center;
            background: #f8f8f8;
            left:0;
            right:0;
            top:0;
            bottom:0;
            margin:auto;
         }
        ._border{
            width:300px;
            height: 150px;
            position: absolute;
            left:0;
            right:0;
            top:0;
            bottom:0;
            margin:auto;
            line-height: 150px;
             text-align: center;
             font-size: 80px;
             font-weight: bolder;
             letter-spacing: 15px;
             -webkit-text-fill-color: transparent;
             background-image: linear-gradient(left,#00a0e4,#fff 25%,#00a0e4 50%,#fff 75%,#00a0e4);
             background-size: 200%,100%;
             -webkit-background-clip: text;
             -webkit-animation: word 20s linear infinite ;
         }
         @keyframes word {
             0%{background-position: 0 0}
             100%{background-position: -1000% 0}
         }

</style>
