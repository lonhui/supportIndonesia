<template>
    <div id="activity">
        <div class="top_button">
            <div class="button_DP" @click="rankShow = true"><img src="../assets/img/button_DP.png"></div>
            <div class="thumbsUp">Dukunganmu {{thumbsUp}}</div>
        </div>
        <div class="bottom_button">
            <div class="button_R" @click="openCoinShow"><img src="../assets/img/button_R.png"></div>
            <div class="ranking">Peringkatmu {{ranking}}</div>
        </div>
        <div class="flag">
            <div class="flagpole">
                <p class="top">{{maxNum}}</p>
                <div class="color"></div>
                <div class="Ball">
                    <div class="Ball_1"><div class="red"></div></div>
                    <div class="Ball_2"><div class="red"></div></div>
                    <div class="Ball_3"><div class="red"></div></div>
                    <div class="nationalFlag"><div class="red"></div></div>
                </div>
                 <p class="buttom">0</p>
            </div>
           <div id="like"></div>
        </div>
        <div class="text">Kibarkan bendera hingga ke puncak!</div>
        <div class="button_K" @click="like(1)"><img src="../assets/img/button_Kx1.png"></div>
        <div class="button_praise">
            <div class="button_Kx2" @click="openx2Show"><img src="../assets/img/button_Kx2.png"></div>
            <div class="button_Kx5" @click="openx5Show"><img src="../assets/img/button_Kx5.png"></div>
        </div>
        <div class="components">
            <v-rank v-if="rankShow" @on-close='rankShow = false'></v-rank><!-- 排行榜 -->
            <v-coin v-if='coinShow' @on-close='coinShow = false' :user='user'></v-coin><!-- 获得金币列表 -->
            <v-x2Confirm v-if="x2Show" @on-close='closex2Show'></v-x2Confirm><!-- x2支付金币提示 -->
            <v-x5Confirm v-if="x5Show" @on-close='closex5Show'></v-x5Confirm><!-- x5分享提示 -->
            <v-x5End v-if="x5EndShow" @on-close='x5EndShow = false'></v-x5End><!-- x5次数用完提示 -->
            <v-login v-if="loginShow" @on-close='loginShow = false'></v-login><!-- 登录提示 -->
            <v-internetError v-if="internetErrorShow" @on-close='internetErrorShow = false'></v-internetError><!-- 网络错误提示 -->
            <v-reward v-if="rewardShow" @on-close='closeRewardShow'></v-reward><!-- 获得奖励提示 -->
            <v-goldInadequate v-if="goldInadequateShow" @on-close='goldInadequateShow = false'></v-goldInadequate><!-- 金币不足提示 -->
        </div>
    </div>
</template>

<script>
import $ from 'jquery'
import rank from '../components/rank'
import coin from '../components/coin'
import x2Confirm from '../components/x2Confirm'
import x5Confirm from '../components/x5Confirm'
import x5End from '../components/x5End'
import login from '../components/login'
import internetError from '../components/internetError'
import reward from '../components/reward'
import goldInadequate from '../components/goldInadequate'

export default {
    data(){
        return{
            user:{
                uid:this.GLOBAL.uid,
            },
            thumbsUp:0,//用户累计点赞数
            ranking:500,//用户排行榜名次
            maxNum:100,//当前旗帜最高点赞数
            oldbannerLikeNum:0,
            likeNum:0,//用户本次进入页面点赞数
            likeNumx2:0,
            likeNumx5:0,
            bannerLikeNum:0,//当前旗帜点赞数
            timeoutflag:null,//定时器
            timeoutflagx2:null,
            reward:false,//奖励弹框是否弹出过，
            rankShow:false,
            coinShow:false,
            x2Show:false,
            x5Show:false,
            x5EndShow:false,
            loginShow:false,
            internetErrorShow: false,
            rewardShow:false,
            goldInadequateShow:false,
            timer:null,
            count:0,
            FlagChange:0,//统计本次页面旗帜变化次数
            x5Num:0,//统计今天x5点击，每天只能使用一次
        }
    },
    components:{
        'v-rank': rank,
        'v-coin': coin,
        'v-x2Confirm': x2Confirm,
        'v-x5Confirm': x5Confirm,
        'v-x5End': x5End,
        'v-login': login,
        'v-internetError': internetError,
        'v-reward': reward,
        'v-goldInadequate': goldInadequate,
    },
    mounted(){
        if(this.user.uid == null || this.user.uid == 'null'){
                this.loginShow = true
        }else{
            this.getData()
            this.timingGetData()
        }
    },
   
    methods:{
        openx2Show(){
            if(this.user.uid == null || this.user.uid == 'null'){
                this.loginShow = true
            }else{
                this.x2Show = true
            }
        },
        openx5Show(){
            if(this.user.uid == null || this.user.uid == 'null'){
                this.loginShow = true
            }else{
                if(this.x5Num==0){
                    this.x5Show = true
                }else{
                    this.x5EndShow = true
                }
            }
        },
        openCoinShow(){
            if(this.user.uid == null || this.user.uid == 'null'){
                this.loginShow = true
            }else{
                this.coinShow = true
            }
        },
        closeRewardShow(){
            this.rewardShow = false
        },
        closex2Show(num){
            if(num == 1){
                this.x2Show = false
                this.likeUp(50)
            }else{
                this.x2Show = false
            }
        },
        closex5Show(num){
            if(num == 1){
                if(this.user.uid == null||this.user.uid == 'null'){
                    this.x5Show = false
                    this.loginShow = true
                }else{
                    if(this.x5Num == 0){//0为可用1位不可以
                        this.setLik(5)
                        this.x5Show = false
                        // +5执行6秒，每秒5次
                        var interval = 6000
                        this.timer = setInterval(()=>{
                            if(interval <= 0){
                                return clearInterval(this.timer);
                            }
                            if(this.user.uid == null||this.user.uid == 'null'){
                                this.loginShow = true
                            }else{
                                this.likeAnimation(5)//执行动画
                            }
                            interval = interval - 200
                        },200)
                        this.thumbsUp = this.thumbsUp + 150
                        this.bannerLikeNum = this.bannerLikeNum + 150
                        this.x5Num++
                        this.likeNumx5 = 150
                    }else{
                        this.x5Show = false
                        this.x5EndShow = true
                    }
                }
            }else{
                this.x5Show = false
            }
        },
        // 点赞前判断是否登录
        likeUp(num){
            if(this.user.uid == null||this.user.uid == 'null'){
                this.loginShow = true
            }else{
                // if(num == 50){
                    this.setLik(num)
                // }
            }
        },
        // 点赞
        like(n){
            if(this.user.uid == null||this.user.uid == 'null'){
                this.loginShow = true
            }else{
                if(n!=50){
                    this.thumbsUp = this.thumbsUp + n
                }
                this.likeAnimation(n)//执行动画
                if(n!=50){
                    this.bannerLikeNum = this.bannerLikeNum + n
                }
                if(n==1){
                    this.likeNum = this.likeNum + n
                    this.timg(n)
                }
            }
        },
        //点赞请求
        setLik(n){
            let params = {
                uid:this.user.uid,
                likeType:null,
                count:null,
            }
            if(n==1){
                params.likeType=1,
                params.count=this.likeNum
            }else if(n==50){
                params.likeType=2,
                params.count = 50
            }else if(n==5){
                params.likeType=3,
                params.count = 150
            }
            console.log("count:"+params.count)
            this.$axios.get('http://ai.caping.co.id/v2/active/like',{
                    params:params
                })
                .then((res)=>{
                    console.log(res)
                    if(res.data.code==306){
                        this.goldInadequateShow = true
                    }else if(res.data.code==301){
                        this.loginShow = true
                    }else{
                        if(n==50){
                                this.bannerLikeNum = this.bannerLikeNum+50
                        }
                        this.maxNum =res.data.data.peak
                        this.thumbsUp = res.data.data.likeCount
                        this.bannerLikeNum = res.data.data.location
                        this.ranking = res.data.data.rankSort
                        if(n==1){
                            this.likeNum = 0
                        }else if(n==50){
                            this.like(n)
                        }
                    }
                }).catch((error)=>{
                    console.log(error)
                    this.internetErrorShow = true
                })
        },
        //请求写定时
        timg(n){
            if(this.timeoutflag != null){
                clearTimeout(this.timeoutflag);
            }
            let self = this
            this.timeoutflag=setTimeout(function(){
                // 发送本用户本次点赞次数
                self.setLik(n)//发送请求
            },800)
        },
        // 动画
        likeAnimation(n){
            var options = $.extend({
				obj: $('#like'),  //jq对象，要在那个html标签上显示
				str: "+"+n,  //字符串，要显示的内容;也可以传一段html，如: "<b style='font-family:Microsoft YaHei;'>+1</b>"
				startSize: "12px",  //动画开始的文字大小
				endSize: "30px",    //动画结束的文字大小
				interval: 1200,  //动画时间间隔
				color: "#FFF",    //文字颜色
				callback: function() {}    //回调函数
            }, options);
            var num = Math.ceil(Math.random()*100000) //生成随机数拼接class,保证class不出现相等
			$("body").append("<span class='num"+num+"'>"+ options.str +"</span>");
            var box = $(".num"+num);
			// var left = options.obj.offset().left + options.obj.width() / 2;
            // var top = options.obj.offset().top - options.obj.height();
            // 生成随机数来确定数字出现的位置
            var left = 130 + Math.ceil(Math.random()*100)
            var top = 400 + Math.ceil(Math.random()*70)
            // top 400-470  left 130-230
			box.css({
				"position": "absolute",
				"left": left + "px",
				"top": top + "px",
				"z-index": 9999,
				"font-size": options.startSize,
				"line-height": options.endSize,
                "color": options.color,
                "font-weight":600
			});
			box.animate({
				"font-size": options.endSize,
				"opacity": "0",
				"top": top - parseInt(options.endSize) + "px"
			}, options.interval , function() {
				box.remove();
				options.callback();
            });
        },
        // 发送请求获取页面数据
        getData(){
            this.oldbannerLikeNum = this.bannerLikeNum
            this.$axios.get('http://ai.caping.co.id/v2/active/like',{
                params:{
                    uid:this.user.uid,
                    likeType:4,
                    count:0
                }
            })
            .then((res)=>{
                console.log(res)
                this.maxNum =res.data.data.peak
                this.thumbsUp = res.data.data.likeCount
                this.bannerLikeNum = res.data.data.location
                this.ranking = res.data.data.rankSort
                if(res.data.data.flag){
                    this.x5Num = 0
                }else{
                    this.x5Num = 1
                }
            }).catch((error)=>{
                console.log(error)
            })
        },
        timingGetData(){
             this.timer = setInterval(()=>{
                this.getData()
            },10000)
        }
    },
    beforeDestroy() {
        if(this.timer){clearInterval(this.timer)}
    },
    watch:{
        // 升旗动画
        'bannerLikeNum':function(){
            let a = (this.bannerLikeNum/this.maxNum)*100//变动以后的位置
            if(a>=100){
                if(!this.reward){
                    this.rewardShow = true
                    this.reward = true
                }
                if(a>100){
                    if(this.FlagChange == 0){
                        this.bannerLikeNum = a-100
                    }else if(this.likeNumx5 == 150){
                        this.bannerLikeNum = a-100
                    }else{
                        $(".color").animate({
                            height:100+'%',
                        },1500);
                        $(".Ball").animate({
                            bottom:100+'%',
                        },1500);
                        $(".color").animate({
                            height:0+'%',
                        },100);
                        $(".Ball").animate({
                            bottom:0+'%',
                        },100);
                        a = a-100
                        $(".color").animate({
                            height:a+'%',
                        },500);
                        $(".Ball").animate({
                            bottom:a+'%',
                        },500);
                    }
                    
                }
            }else{
                if(this.FlagChange == 0){
                    $(".color").animate({
                        height:a+'%',
                    },2000);
                    $(".Ball").animate({
                        bottom:a+'%',
                    },2000);
                    this.FlagChange++
                }else if(this.likeNumx5 == 150){
                    $(".color").animate({
                        height:100+'%',
                    },1500);
                    $(".Ball").animate({
                        bottom:100+'%',
                    },1500);
                    $(".color").animate({
                        height:0+'%',
                    },100);
                    $(".Ball").animate({
                        bottom:0+'%',
                    },100);
                    $(".color").animate({
                        height:a+'%',
                    },1500);
                    $(".Ball").animate({
                        bottom:a+'%',
                    },1500);
                    this.likeNumx5 = 0
                }else{
                    $(".color").animate({
                        height:a+'%',
                    },300);
                    $(".Ball").animate({
                        bottom:a+'%',
                    },300);
                }
            }
            $(".color").css({
                "height":a+"%",
            });
        }
    }
}
</script>

<style scoped>
.flagpole .color{
    width:100%;
    height: 0;
    background: url("../assets/img/pillar_back.png");
    position:absolute;
    bottom: 0
}
.button_R{width: 300px}
img{
    width: 100%;
    height: 100%
}
.top_button{
    width: 650px;
    height: 60px;
    padding-top: 60px;
    margin: 0 auto
}
.button_DP{
    width: 260px;
    float: left
}
.thumbsUp{
    color: #FFF000;
    font-size: 32px;
    font-weight:bold;
    float: left;
    margin-left: 80px;
    line-height: 60px
}
.bottom_button{
    width: 650px;
    height: 60px;
    padding-top:20px;
    margin: 0 auto
}
.button_R{
    width: 260px;
    float: left
}
.ranking{
    color: #FFF000;
    font-size: 32px;
    font-weight:bold;
    float: left;
    margin-left: 80px;
    line-height: 60px
}
.flag{
    width: 650px;
    height: 740px;
    margin: 80px auto 0
}
.text{
    color: #fff;
    text-align: center;
    font-size: 30px;
    margin-top: 25px
}
.button_K{
    width: 300px;
    margin: 25px auto 25px
}
.button_Kx2{
    width: 250px;
    float: left
}
.button_Kx5{
    width: 250px;
    float: left;
    margin-left: 60px
}
.button_praise{
    width: 560px;
    height: 65px;
    margin: 0 auto
}
.flagpole{
    width: 20px;
    height: 670px;
    background: url("../assets/img/pillar.png") no-repeat;
    background-size: 100% 100%;
    background-size:cover;
    margin-left: 100px;
    margin-top: 50px;
    position: relative
}
.flagpole p{
    background: linear-gradient(to bottom, #FFF000, #FFA331);
    -webkit-background-clip: text;
    color: transparent;
    font-size: 36px;
    font-weight: 700
}
.flagpole .top{
    position:absolute;
    top: -20px;
    left: -100px
}
.flagpole .buttom{
    position:absolute;
    bottom: -10px;
    left: -70px
}
.flagpole .Ball{
    width: 600px;
    height: 30px;
    position:absolute;
    bottom: 0;
    left: -25px
}
.flagpole .Ball .Ball_1{
    width: 70px;
    height: 70px;
    background-color: #fff;
    border-radius: 50px;
    float: left
}
.flagpole .Ball .Ball_1 .red{
    width: 70px;
    height: 36px;
    background-color: red;
    border-radius: 50px 50px 0 0
}
.flagpole .Ball .Ball_2{
    width: 50px;
    height: 50px;
    background-color: #fff;
    border-radius: 50px;    
    float: left;
    margin-top: 10px;
    margin-left:20px
}
.flagpole .Ball .Ball_2 .red{
    width: 50px;
    height: 25px;
    background-color: red;
    border-radius: 50px 50px 0 0
}
.flagpole .Ball .Ball_3{
    width: 30px;
    height: 30px;
    background-color: #fff;
    border-radius: 50px;   
    float: left; 
    margin-top: 20px;
    margin-left:20px
}
.flagpole .Ball .Ball_3 .red{
    width: 30px;
    height: 15px;
    background-color: red;
    border-radius: 50px 50px 0 0
}
.flagpole .Ball .nationalFlag{
    width: 320px;
    height: 160px;
    background-color: #fff;
    border-radius: 30px;   
    float: left; 
    margin-left:20px;
    position: relative;
    top:-40px
}
.flagpole .Ball .nationalFlag .red{
    width: 320px;
    height: 80px;
    background-color: red;
    border-radius: 20px 20px 0 0
}
</style>
