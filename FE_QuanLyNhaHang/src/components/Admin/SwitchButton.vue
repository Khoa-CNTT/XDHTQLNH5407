<template>
    <div @click="$emit('toggle')" :class="[
        'hover:cursor-pointer w-16 h-8 flex rounded-full border-2 border-black items-center p-1 transition-all duration-300',
        status === 1 ? 'justify-end' : 'justify-start'
    ]">
        <div :class="[
            'w-6 h-6 rounded-full transition-all duration-300',
            status === 1 ? 'bg-green-500' : 'bg-red-500'
        ]"></div>
    </div>
</template>

<script setup>
defineProps({
    status: {
        type: Number,
        required: true,
    },
})

defineEmits(['toggle'])
</script>
