<template>
    <HeaderAdmin></HeaderAdmin>
    <LeftAdmin></LeftAdmin>
</template>
<script>
import HeaderAdmin from './headerMenu.vue'
import LeftAdmin from './leftMenu.vue'
export default {

    name: 'app',
    components: {
        HeaderAdmin,
        LeftAdmin
    }
}
</script>