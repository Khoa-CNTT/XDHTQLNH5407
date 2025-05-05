<template>
    <!-- <Header></Header> 
     đừng bỏ header vô đaya -->
    <div class="background">
        <div class="text" style="font-size: 3rem;">Chào Mừng Bạn Đến PHÊ FOOD</div>
        <div class="text" style="font-size: 2rem;">Cùng phê food - ăn quên lối về</div>
        <div class="text" style="font-size: 2rem;">Giá từ <strong style="color: red;">139.000VNĐ / 4 người</strong>
        </div>
    </div>
    <div class="menu-container">
        <div class="content">
            <div class="col-left">
                <div class="introduce">
                    <p>Về chúng tôi </p>
                    <img src="/imageicon/phefood.png" alt="">
                </div>
                <p>🌟 Chào mừng đến với Phê food, nơi hội tụ tinh hoa ẩm thực với những món ăn được chế biến tỉ mỉ từ
                    nguyên
                    liệu tươi ngon nhất. Không gian sang trọng, cùng cung cách phục vụ tận tâm sẽ mang đến cho thực
                    khách những trải nghiệm trọn vẹn, từ những bữa ăn gia đình ấm áp đến những buổi tiệc sang trọng đáng
                    nhớ. 🍽️✨</p>
            </div>
            <div class="col-right">
                <img src="/imageicon/pictureintroduce.jpg" alt="">
            </div>
        </div>
        <div class="menu-card" data-aos="fade-up" data-aos-offset="200" data-aos-duration="1000"
            data-aos-easing="ease-out-cubic">
            <MenuCard></MenuCard>
        </div>
    </div>
    <!-- <Footer></Footer>
 footer với router-view trương tự
 có thể bỏ tuỳ trường hợp 
    <router-view></router-view> -->
</template>
<script setup>
import Header from '../../layout/client/Header.vue'
import MenuCard from '../../components/Users/MenuCard.vue';
import Footer from '../../layout/client/Footer.vue';
import '../../assets/css/Home.css'
import AOS from 'aos'
import 'aos/dist/aos.css'

import { onMounted } from 'vue'

onMounted(() => {
    AOS.init()
})
</script>
<style></style>
