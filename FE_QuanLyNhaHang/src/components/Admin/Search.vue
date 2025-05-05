<template>
    <input class="ps-2 w-44 h-10 font-bold text-2xl rounded-lg border-gray-400 border-2" type="text"
        :placeholder="placeholder" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" />
</template>

<script>
export default {
    props: {
        modelValue: String,
        placeholder: {
            type: String,
            default: 'search'
        }
    }
}
</script>
