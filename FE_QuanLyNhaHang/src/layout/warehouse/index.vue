<template>
    <div>
        <HeaderWarehouse></HeaderWarehouse>
        <router-view></router-view>
    </div>
</template>

<script>
import HeaderWarehouse from './headerWarehouse.vue';

export default {
    name: 'app',
    components: {
        HeaderWarehouse,
    }
}
</script>