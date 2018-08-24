<template>
    <div id="index">
        <div class="header">
            <img src="../assets/img/title.png">
        </div>
        <div class="content">
            <div class="text">
                <p>BERIKAN DUKUNGANMU</p>
                <p>UNTUK INDONESIA!</p>
            </div>
            <div class="total">
                <div class="flower"><img src="../assets/img/flower.png"></div>
                <h2>Total Dukungan Terkumpul</h2>
                <div class="num">
                    <p>{{likeNum}}</p>
                    <div class="box"><div class="box_top"></div></div>
                </div>
            </div>
            <div class="but1" @click="ruleShow = true">
                <img src="../assets/img/button_2.png">
            </div>
            <div class="but2" v-show="buttonShow">
                <router-link to='/activity'><img src="../assets/img/button_1.png"></router-link>
            </div>
            <div class="but2" v-show="!buttonShow">
                <img src="../assets/img/button_1.png" @click="loginShow = true">
            </div>
        </div>
        <div class="components">
            <v-rule v-show="ruleShow" @on-close='closeRuleShow'></v-rule>
            <v-internetError v-if="internetErrorShow" @on-close='internetErrorShow = false'></v-internetError>
            <v-login v-if="loginShow" @on-close='loginShow = false'></v-login>
        </div>
    </div>
</template>

<script>
import rule from '../components/rule'
import internetError from '../components/internetError'
import login from '../components/login'

export default {
    data() {
        return{
            ruleShow:false,
            likeNum:'0',//总累计点赞数
            user:{
                uid:null,
                deviceId:null
            },
            timer:null,
            internetErrorShow:false,
            loginShow:false,
            buttonShow:true
        }
    },
    mounted(){
        this.getData()
        this.getUid()
        this.login()
        this.timingGetData()
        if(this.user.uid == null || this.user.uid == null){
            // 未登录
            this.loginShow = true
            this.buttonShow = false
        }
    },
    components:{
        'v-rule': rule,
        'v-internetError': internetError,
        'v-login': login
    },
    methods:{
        login(){
            this.$axios.get('http://ai.caping.co.id/v2/active/like',{
                params:{
                    uid:this.user.uid,
                    likeType:4,
                    count:0
                }
            })
            .then((res)=>{
               if(res.data.code==301){
                   this.buttonShow = false
               }
            }).catch((error)=>{
                console.log(error)
            })
        },
        closeRuleShow(){this.ruleShow = false},
        getData(){
            // 调接口获取总累计点赞
             this.$axios.get('http://ai.caping.co.id/v2/active/like/index')
            .then((res)=>{
                console.log(res)
                this.likeNum = res.data.data
            }).catch((error)=>{
                console.log(error)
            })
        },
        timingGetData(){
             this.timer = setInterval(()=>{
                this.getData()
            },6000)
        },
        // 获取uid deviceId
        getUid(){
            const url = window.location.href
            let a = url.indexOf('?')//得到？的下标
            const indexUrl=url.substring(0,a)
            if(a>=0){
                let b = url.substring(a+1)//得到？后面的字符串
                let e = b.lastIndexOf('&')//得到最后一个&的下标
                let c = b.indexOf('u=')//得到u=的下标
                if(c>=0){
                    if(c<e){
                        let uid = b.substring(c).substring(2,b.substring(c).indexOf('&'))
                        this.user.uid = uid
                    }else{
                        let uid = b.substring(c+2)
                        this.user.uid = uid
                    }
                }else{
                    this.GLOBAL.uid = this.user.uid
                }
                let d = b.indexOf('c=')//得到c=的下标
                if(d>=0){
                    if(d<e){
                        let device_id = b.substring(d).substring(2,b.substring(d).indexOf('&'))
                        this.user.device_id = device_id
                    }else{
                        let device_id = b.substring(d+2)
                        this.user.deviceId = device_id
                    }
                }
            }
                this.GLOBAL.uid = this.user.uid
             
        }
    },
    beforeDestroy() {
        if(this.timer){clearInterval(this.timer)}
    }
}
</script>

<style scoped>
.header{
    width: 600px;
    margin: 0 auto;
    padding-top: 80px
}
img {
    width: 100%;
    height: 100%
}
.text{
    color: #fff;
    font-size: 40px;
    text-align: center;
    margin-top: 150px;
    line-height: 55px
}
.total{
    width: 550px;
    height: 210px;
    margin: 120px auto 0;
    background: url("../assets/img/box_1.png") no-repeat;
    background-size: 100% 100%;
    background-size:cover;
    position: relative
}
.flower{
    width: 120px;
    position:absolute;
    bottom:135px;
    left:480px
}
.total h2{
    color: #fff;
    font-size: 36px;
    text-align: center;
    padding-top: 30px;
    font-family:concertone
}
.total .num{
    width: 500px;
    margin:  20px auto 0
}
.total p{
    width: 320px;
    font-size: 54px;
    font-weight: 800;
    text-align: right;
    background: linear-gradient(to bottom, #FFF000, #FFA331);
    -webkit-background-clip: text;
    color: transparent;
    float: left
}
.box{
    width: 120px;
    height: 60px;
    background-color: aliceblue;
    float: left;
    margin-left: 10px;
    border-radius: 15px
}
.box .box_top{
    width: 120px;
    height: 30px;
    background-color: red;
    border-radius:14px 14px 0 0
}
.but1{
    width: 240px;
    height: 60px;
    margin: 120px auto 0
}
.but2{
    width: 450px;
    height: 100px;
    margin: 120px auto 0
}
</style>
