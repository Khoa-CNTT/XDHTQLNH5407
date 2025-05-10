<template>
    <div @click="toggle" :class="[
        'hover:cursor-pointer w-16 h-8 flex rounded-full border-2 border-black items-center p-1 transition-all duration-300',
        modelValue === 1 ? 'justify-end' : 'justify-start'
    ]">
        <div :class="[
            'w-6 h-6 rounded-full transition-all duration-300',
            modelValue === 1 ? 'bg-green-500' : 'bg-red-500'
        ]"></div>
    </div>
</template>

<script setup>
const props = defineProps({
    modelValue: {
        type: Number,
        default: 1
    }
})

const emit = defineEmits(['update:modelValue', 'toggle'])

function toggle() {
    const newValue = props.modelValue === 1 ? 0 : 1
    emit('update:modelValue', newValue)
    emit('toggle', newValue)
}
</script>
