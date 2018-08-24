<template>
    <div id="coin">
        <!-- 用户所获得的金币页面 -->
        <div class="coin">
            <div class="close" @click="close"><img src="../assets/img/close.png"></div>
            <div class="content">
                <div class="table">
                    <table>
                        <tbody>
                            <th>Tanggal</th>
                            <th>Jumlah Reward</th>
                        </tbody>
                        <tr v-for="item in list" :key="item.index">
                            <td>{{item.time}}</td>
                            <td class="money"><p>{{item.money}}</p></td>
                        </tr>
                    </table>
                </div>
            </div>
            <div class="arrow"><img src="../assets/img/arrow.png"></div>
        </div>
        <div class="components">
            <v-internetError v-if="internetErrorShow" @on-close='internetErrorShow = false'></v-internetError>
        </div>
    </div>
</template>

<script>
import internetError from './internetError'

export default {
    props:['user'],
    data(){
        return{
            list:[],
            internetErrorShow:false
        }
    },
    mounted(){this.getData()},
    components:{'v-internetError': internetError},
    methods:{
        close(){this.$emit('on-close')},
        getData(){
             this.$axios.get('http://ai.caping.co.id/v2/active/like/info',{
                 params:{
                     uid:this.user.uid
                 }
             })
            .then((res)=>{
                console.log(res)
                if(res.data.code==301){
                    this.loginShow = true
                }else{
                    this.list=res.data.data.list
                }
                
            }).catch((error)=>{
                console.log(error)
                this.internetErrorShow = true
            })
        }
    }
}
</script>

<style scoped>
#coin{
    position: fixed;
    z-index: 100;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(7, 17, 27, 0.8)
}
.coin{
    width: 620px;
    height: 850px;
    margin: 140px auto;
    background: url("../assets/img/coin_back.png") no-repeat;
    background-size: 100% 100%;
    background-size:cover;
    position: relative;
    font-family:concertone
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
.content{
    width: 450px;
    margin: 0 auto;
    padding-top: 40px
}
.content .table{
    width: 100%;
    height: 680px;
    margin-top: 20px;
    overflow-y: auto
}
.content table{
    width: 95%;
    text-align: center;
    margin: 0 auto
}
.content th{
    font-size: 32px;
    font-weight: 600;
    vertical-align: middle
}
.content tbody{border-bottom: #A3A3A3 2px solid}
.content td{
    font-size: 28px;
    font-weight: 600;
    height: 70px;
    vertical-align: middle
}
.arrow{
    width: 50px;
    margin: 0 auto;
    position:absolute;
    bottom: 30px;
    left: 275px
}
</style>
