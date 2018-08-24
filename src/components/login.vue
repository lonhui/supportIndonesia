<template>
    <div id="login" @touchmove.prevent>
        <!-- 登录提示 -->
        <div class="login">
            <div class="close" @click="close"><img src="../assets/img/close.png"></div>
            <p>Oops, kamu harus login dulu untuk ikutan</p>
        </div>
    </div>
</template>

<script>
export default {
    methods:{
        close(){this.$emit('on-close')}
    }
}
</script>

<style scoped>
#login{
    position: fixed;
    z-index: 100;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(7, 17, 27, 0.8)
}
 .login{
    width: 600px;
    height: 400px;
    background-color: #FFF;
    border-radius: 20px;
    border: 10px #FCCF4E solid;
    margin: 400px auto 0;
    position: relative
}
img{
    width: 100%;
    height: 100%
}
p{  
    width: 500px;
    font-size: 40px;
    line-height: 60px;
    text-align: center;
    margin: 0 auto;
    padding-top: 120px;
    font-family:concertone
}
.close{
    width: 80px;
    position:absolute;
    top:-30px;
    right: -30px
}
</style>