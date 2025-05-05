<template>
    <div class="w-full h-24 flex flex-row justify-center items-center gap-2">
        <div @click="changePage(1)"
            class="w-10 h-10 bg-gray-300 rounded-full flex justify-center items-center hover:bg-blue-200 cursor-pointer">
            <p class="font-semibold text-2xl">&lt;&lt;</p>
        </div>
        <div @click="changePage(currentPage - 1)"
            class="w-10 h-10 bg-gray-300 rounded-full flex justify-center items-center hover:bg-blue-200 cursor-pointer">
            <p class="font-semibold text-2xl">&lt;</p>
        </div>

        <div v-for="page in totalPages" :key="page" :class="['w-10 h-10 rounded-full flex justify-center items-center font-semibold text-2xl',
            currentPage === page ? 'bg-blue-500 text-white' : 'bg-gray-300 hover:bg-blue-200 cursor-pointer']"
            @click="changePage(page)">
            <p>{{ page }}</p>
        </div>

        <div @click="changePage(currentPage + 1)"
            class="w-10 h-10 bg-gray-300 rounded-full flex justify-center items-center hover:bg-blue-200 cursor-pointer">
            <p class="font-semibold text-2xl">&gt;</p>
        </div>
        <div @click="changePage(totalPages)"
            class="w-10 h-10 bg-gray-300 rounded-full flex justify-center items-center hover:bg-blue-200 cursor-pointer">
            <p class="font-semibold text-2xl">&gt;&gt;</p>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    currentPage: {
        type: Number,
        required: true
    },
    totalPages: {
        type: Number,
        required: true
    }
})

const emit = defineEmits(['page-changed'])

const changePage = (page) => {
    if (page >= 1 && page <= props.totalPages) {
        emit('page-changed', page)
    }
}

const goToFirstPage = () => changePage(1)
const goToLastPage = () => changePage(props.totalPages)
const goToPrevPage = () => changePage(props.currentPage - 1)
const goToNextPage = () => changePage(props.currentPage + 1)
</script>
