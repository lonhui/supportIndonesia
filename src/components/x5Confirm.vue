<template>
    <div id="x5Confirm" @touchmove.prevent>
        <!-- 确认用户是否确定要用“Super boost 5x”功能弹窗 -->
        <div class="x5Confirm">
            <div class="close" @click="close_no"><img src="../assets/img/close.png"></div>
            <p>Apakah kamu mau memberikan 150 dukungan dengan cara bagikan event ini keluar Caping?</p>
            <div>
                <div class="aaaaaa"><img src="../assets/img/share.png" @click="share"></div>
                <div id="sss"></div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    created(){
        window.shareSucceed = this.shareSucceed;
        var that = this
    },
    methods:{
        close_no(){this.$emit('on-close',0)},
        close_yes(){this.$emit('on-close',1)},
        shareSucceed(){this.close_yes()},
        share(){
            let title = 'Dukung Indonesia di Caping dan raih koin sebanyak mungkin!'
            let content = 'Dukung Indonesia di Caping dan raih koin sebanyak mungkin!'
            let pic = null
            var url ='http://campaign.caping.co.id/dukungindonesia/'
            CapingJs.share(title, content,url,pic)
        }
    }
    
}
</script>

<style scoped>
#x5Confirm{
    position: fixed;
    z-index: 100;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(7, 17, 27, 0.8)
}
.x5Confirm{
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
.aaaaaa{
    width: 200px;
    margin: 20px auto 0
}
p{  
    width: 500px;
    font-size: 38px;
    line-height: 45px;
    text-align: center;
    margin: 0 auto;
    padding: 40px;
    font-family:concertone
}
.close{
    width: 70px;
    position:absolute;
    top:-30px;
    right: -30px
}
.button{
    width: 200px;
    height: 60px;
    margin: 50px auto 0
}
.aaa{
    width: 400px;
    margin: 0 auto
}
</style>
