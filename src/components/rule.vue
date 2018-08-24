<template>
    <div id="rule">
        <!-- 游戏规则页面 -->
        <div class="box">
            <div class="close" @click="close"><img src="../assets/img/close.png"></div>
            <h2>DUKUNG INDONESIA</h2>
            <div class="content">
                <p>1. Tunjukan rasa nasionalisme kamu dengan cara mendukung Indonesia bersama Capingers lainnya.</p>
                <p>2. Kamu akan bekerjasama dengan Capingers lainnya untuk memberikan dukungan dengan cara mengibarkan bendera Indonesia hingga ke puncak.</p>
                <p>3. Tap berkali-kali tombol “Kibarkan” supaya bendera bisa berkibar hingga ke puncak. 1 tap = 1 dukungan.</p>
                <p>4. Apabila bendera sudah berkibar ke puncak, kamu yang berkontribusi memberikan dukungan akan mendapatkan sejumlah reward Tabungan Caping.</p>
                <p>5. Cek jumlah reward Tabungan Caping yang kamu dapat di menu “Daftar Peringkat”.</p>
                <p>6. Kamu akan bisa mendapatkan reward Tabungan Caping lebih banyak apabila kamu menggunakan 2 fitur ini yang bisa membantu mengibarkan bendera lebih cepat menuju puncak:</p>
                <p>● Fitur Double Boost, yang bisa membantu kamu memberikan 50 dukungan sekaligus dengan menggunakan Tabungan Caping Rp 200.</p>
                <p>● Fitur Super Boost, yang bisa membantu kamu memberikan 150 dukungan sekaligus. Fitur ini juga hanya bisa kamu dapatkan sekali dalam sehari, apabila kamu sudah membagikan event ini keluar Caping. Tombol “Bagikan” bisa kamu lihat pada fitur ini.</p>
                <p>7. Kamu bisa melihat jumlah dukungan yang sudah kamu berikan pada menu ”Daftar peringkat”.</p>
                <p>8. Raih peringkat setinggi-tingginya dan terus berikan dukunganmu untuk Indonesia.</p>  
                <h3>Syarat & Ketentuan:</h3>
                <p>1. Periode event 15-29 Agustus 2018.</p>
                <p>2. Peserta yang ikutan, wajib menggunakan Caping versi terupdate.</p>
                <p>3. Peserta hanya bisa ikutan apabila sudah login ke akun Caping.</p>
                <p>4. Untuk menggunakan Fitur Double Boost, Kamu harus memiliki Tabungan Caping yang cukup (dapatkan tabungan dari poin yang kamu raih melalui aktivitas di Caping. Kamu dapat melihat cara mengumpulkan poin pada halaman FAQ).</p>
                <p>5. Kamu yang mendapatkan reward Tabungan Caping, akan dikirimkan langsung ke akun kamu dalam jangka waktu maksimal 3x24 jam.</p>
                <p>6. Peserta yang terbukti melakukan kecurangan dalam mengikuti event ini akan otomatis didiskualifikasi dan akunnya  akan masuk dalam daftar hitam.</p>
                <p>7. Peserta yang mengikuti event ini dianggap telah setuju dengan syarat & ketentuan yang berlaku.</p>
                <p>8. Syarat & ketentuan dapat berubah sewaktu-waktu tanpa pemberitahuan lebih lanjut. Mohon cek halaman ini secara berkala.</p>
            </div>
        </div>
    </div>    
</template>

<script>
export default {
    methods:{close(){this.$emit('on-close')}}
}
</script>

<style scoped>
#rule{
    position: fixed;
    z-index: 100;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(7, 17, 27, 0.8)
}
.box{
    width: 600px;
    height: 1000px;
    background-color: #FFF;
    margin: 130px auto 0;
    border-radius: 20px;
    border: 10px #BDBBBC solid;
    position: relative

}
.close{
    width: 80px;
    position:absolute;
    top:-25px;
    right:-25px
}
img{
    width: 100%;
    height: 100%
}
h2{
    font-size: 40px;
    text-align: center;
    margin-top: 40px;
    font-family:concertone
}
h3{
    font-size: 32px;
    line-height: 36px;
    margin-top: 50px;
    font-family:concertone;
    font-weight: 600
}
.content{
    width: 530px;
    height: 870px;
    margin: 30px auto 0;
    overflow-y: auto
}
p{
    font-size: 28px;
    line-height: 36px;
    margin-top: 30px;
    font-family:concertone
}
</style>
