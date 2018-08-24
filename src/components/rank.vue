<template>
    <div id="rank">
        <!-- 排行榜 -->
        <div class="rank">
            <div class="close" @click="close"><img src="../assets/img/close.png"></div>
            <div class="content">
                <div class="table">
                    <table>
                        <tbody>
                            <th>Peringkat</th>
                            <th>Username</th>
                            <th>Dukungan</th>
                        </tbody>
                        <tr v-for="(item,index) in list" :key='index'>
                            <td>{{(index+1)+(pageNum-1)*pageSize}}</td>
                            <td>{{item.name}}</td>
                            <td>{{item.totalCount}}</td>
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
    data(){
        return{
            list:[],
            Fifthx100:{
                index:500,
                name:'',
                totalCount:''
            },
            pageNum:1,
            pageSize:500,
            internetErrorShow:false
        }       
    },
    mounted(){this.getData()},
    components:{'v-internetError': internetError},
    methods:{
        close(){this.$emit('on-close')},
        getData(){
            this.$axios.get('http://ai.caping.co.id/v2/active/like/rank',{
                params:{
                    pageNum:this.pageNum,
                    pageSize:this.pageSize
                }
            })
            .then((res)=>{
                this.list = res.data.data.list
                for(let i = 0; i<this.list.length;i++){
                    if(this.list[i].name.length>20){
                        this.list[i].name = this.list[i].name.substring(0,15)+'...'
                    }
                }
                this.get500()
            }).catch((error)=>{
                this.internetErrorShow = true
            })
        },
        get500(){
            for(let i = 0; i < this.list.length; i++){
                if(i==500){
                    this.Fifthx100.name = this.list[i].name
                    this.Fifthx100.totalCount = this.list[i].totalCount
                }
            }
        }
    }
}
</script>

<style scoped>
#rank{
    position: fixed;
    z-index: 100;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(7, 17, 27, 0.8);
}
.rank{
    width: 670px;
    height: 1000px;
    margin: 140px auto 0;
    background: url("../assets/img/rank_back.png") no-repeat;
    background-size: 100% 100%;
    background-size:cover;
    position: relative;
    font-family:concertone;
}
.close{
    width: 80px;
    position: absolute;
    top:-15px;
    right: 50px;
}
img{
    width: 100%;
    height: 100%;
}
.content{
    width: 480px;
    margin: 0 auto;
    padding-top: 60px;
}
.content .table{
    width: 100%;
    height: 800px;
    overflow-y: auto;
}
.content table{
    width: 90%;
    text-align: center;
    margin: 0 auto;
    line-height: 60px;
}
.content th{
    font-size: 30px;
    font-weight: 600;
}
.content tbody{
    border-bottom: #A3A3A3 2px solid;
}
.content td{
    font-size: 24px;
}
.arrow{
    width: 50px;
    margin: 10px auto 0;
}
</style>
