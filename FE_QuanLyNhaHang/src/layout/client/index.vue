<template>
    <Header style="position: sticky; top: 0;  z-index: 1000;" ></Header>
    <div :style="{minHeight: 'calc(110vh - 50px - 352px)' }">
        <router-view></router-view>
    </div>
    <ChatBox></ChatBox>
    <ChatBot></ChatBot>
    <Footer></Footer>
</template>
<script setup>
import Header from './Header.vue'
import Footer from './Footer.vue';
import '../../assets/css/Home.css'
import AOS from 'aos'
import 'aos/dist/aos.css'

import { onMounted } from 'vue'
import ChatBox from './ChatBox.vue';
import ChatBot from './ChatBot.vue';

onMounted(() => {
    AOS.init()
})
</script>
<style></style>
