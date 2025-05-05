<template>
    <HeaderAdmin></HeaderAdmin>
    <LeftAdmin></LeftAdmin>
    <router-view></router-view>
    <ChatBox></ChatBox>
</template>

<script>
import ChatBox from './ChatBox.vue';
import HeaderAdmin from './headerMenu.vue'
import LeftAdmin from './leftMenu.vue'
export default {

    name: 'app',
    components: {
        HeaderAdmin,
        LeftAdmin,
        ChatBox
    }
}
</script>