<template>
    <div class="rounded-full border-black border-2 h-16 w-16 overflow-hidden flex justify-center items-center">
        <img :class="[fullImage ? 'w-full h-full' : 'w-12 h-12', 'object-cover']" :src="src" alt="" />
    </div>
    <p>{{ label }}</p>
</template>

<script setup>
defineProps({
    src: String,
    label: String,
    fullImage: Boolean
})
</script>
