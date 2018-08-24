<template>
    <div id="reward" @touchmove.prevent>
        <!-- 获得奖励提示 -->
        <div class="reward">
            <div class="close" @click="close"><img src="../assets/img/close.png"></div>
            <div class="text">
                <p class="p">Yeay,<br>
                bendera sudah berkibar<br>
                di puncak!<br>
                Terima kasih sudah<br>
                memberikan dukungan. Cek<br>
                reward dan peringkatmu ya!</p>
                <br>
                <p>Ikuti terus event ini, dapatkan<br>
                reward sebanyak-banyaknya<br>
                dan raih peringkat setinggi<br>
                mungkin!</p>
            </div>
            <div class="coin"><img src="../assets/img/reward_coin.png"></div>
            <div class="logo"><img src="../assets/img/reward_logo.png"></div>
        </div>
    </div>
</template>

<script>
export default {
    methods:{close(){this.$emit('on-close')}}
}
</script>

<style scoped>
#reward{
    position: fixed;
    z-index: 100;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(7, 17, 27, 0.8)
}
.reward{
    width: 620px;
    height: 850px;
    margin: 140px auto 0;
    background: url("../assets/img/coin_back.png") no-repeat;
    background-size: 100% 100%;
    background-size:cover;
    position: relative
}
.close{
    width: 80px;
    position: absolute;
    top:-15px;
    right: 50px
}
img{
    width: 100%;
    height: 100%
}
.text{
    width: 450px;
    margin: 0 auto;
    padding-top: 40px
}
p{  
    font-size: 36px;
    line-height: 38px;
    text-align: center;
    font-family:concertone
}
.coin{
    width: 450px;
    margin: 40px auto 0
}
.logo{
    width: 450px;
    margin: 40px auto 0
}
</style>
