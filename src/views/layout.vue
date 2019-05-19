<template>
    <div class="wrap">
        <loading :show="!!name"></loading>
        <router-view></router-view>
    </div>
</template>

<script>
import loading from "../components/loading";
export default {
    
    components:{
        loading
    },

    data(){

        return {

            name:null

        }

    },

    methods:{
        
    
    },
    created(){
        // this.checkClient();
    }
}
</script>

<style>
    .wrap{
        width: 100%;
        height:100%;
    }
</style>
