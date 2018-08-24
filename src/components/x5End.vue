<template>
    <div id="x5End" @touchmove.prevent>
        <!-- 每当用户已用过“super boost 5x”功能，将会弹出此弹窗 -->
        <div class="x5End">
            <div class="close" @click="close"><img src="../assets/img/close.png"></div>
            <p>Oops! Kamu sudah menggunakan fitur ini. Coba lagi besok ya!</p>
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
#x5End{
    position: fixed;
    z-index: 100;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(7, 17, 27, 0.8)
}
.x5End{
    width: 600px;
    height: 400px;
    background-color: #FFF;
    border-radius: 20px;
    margin: 400px auto 0;
    position: relative;
    border: 10px #FCCF4E solid
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
    padding-top: 80px;
    font-family:concertone
}
.close{
    width: 80px;
    position:absolute;
    top:-30px;
    right: -30px
}
</style>
