<template>
    <header>
        <div class="cover-l">
            <div class="menu point icon-cover" @click="menu_fold"><i></i></div>
            <div class="title">房客网留言数据统计</div>
        </div>
        <div class="cover-r">
            <div class="user-name">欢迎你，老哥</div>
        </div>
    </header>
</template>

<script>
export default {

    methods:{
        
        menu_fold(){

            this.$emit('sidebar-flod');

        }

    }

}
</script>

<style lang="less" scoped>
header{
    width: 100%;
    height:70px;
    background-color:#00a0e4;
    color:#fff;
    padding-right:20px;
    box-sizing: border-box;
    .icon-cover{
        width: 70px;
        height:70px;
        i{
            display: block;
            width: 50px;
            height:50px;
            margin: 10px auto;
        }
    }
    .cover-l,.cover-r{
        line-height: 70px;
    }
    .cover-l{
        float:left;
        font-size:0;
        .menu,.title{
            display: inline-block;
            vertical-align: middle;
        }
        .menu{
            margin-right:10px;
            i{
                background-image:url('../assets/images/header-menu.png');
                background-repeat: no-repeat;
            }
        }
        .title{
            font-size:22px;
            letter-spacing: 1px;
        }
    }
    .cover-r{
        float:right;
        .user-name,.user-icon{
            display: inline-block;
            vertical-align: middle;
        }
    }
}
</style>
