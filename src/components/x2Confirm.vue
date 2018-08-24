<template>
    <div id="x2Confirm" @touchmove.prevent>
        <!-- 确认用户是否确定要用“Double boost 2x”功能弹窗 -->
        <div class="x2Confirm">
            <p>Apakah kamu mau memberikan 50 dukungan dengan menggunakan Tabungan Caping <span>Rp. 200</span> ?</p>
            <div class="button">
                <div class="yes" @click="close_yes"><img src="../assets/img/yes.png"></div>
                <div class="no" @click="close_no"><img src="../assets/img/no.png"></div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    methods:{
        close_yes(){this.$emit('on-close',1)},
        close_no(){this.$emit('on-close',0)}
    }
}
</script>

<style scoped>
#x2Confirm{
    position: fixed;
    z-index: 100;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(7, 17, 27, 0.8)
}
.x2Confirm{
    width: 600px;
    height: 400px;
    background-color: #FFF;
    border-radius: 20px;
    border: 10px #FCCF4E solid;
    margin: 400px auto 0
    
}
p{
    width: 520px;
    margin: 0 auto;
    padding: 40px;
    font-family:concertone;
    font-size: 40px;
    line-height: 45px;
    text-align: center
}
span{color: red}
img{
    width: 100%;
    height: 100%
}
.yes{
    width: 200px;
    height: 60px;
    float: left
}
.no{
    width: 200px;
    height: 60px;
    float: left;
    margin-left: 55px
}
.button{
    width: 460px;
    height: 60px;
    margin: 10px auto 0
}
</style>
