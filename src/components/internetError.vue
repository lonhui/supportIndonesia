<template>
    <div id="internetError" @touchmove.prevent>
        <!-- 网路不稳定弹窗 -->
        <div class="internetError">
            <div class="close" @click="close"><img src="../assets/img/close.png"></div>
            <p>Koneksi internet tidak stabil. Silahkan coba lagi ya!</p>
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
#internetError{
    position: fixed;
    z-index: 100;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(7, 17, 27, 0.8)
}
.internetError{
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
    width: 450px;
    font-size: 40px;
    line-height: 60px;
    text-align: center;
    margin: 0 auto;
    padding-top: 100px;
    font-family:concertone
}
.close{
    width: 80px;
    position:absolute;
    top:-30px;
    right: -30px
}
</style>