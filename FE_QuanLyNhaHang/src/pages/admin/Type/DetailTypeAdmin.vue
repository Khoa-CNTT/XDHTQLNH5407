<template>
    <div class="w-[calc(100vw-300px)] h-[calc(100vh-100px)] fixed z-0 mt-20 ms-[300px] flex flex-col p-2">
        <div class="h-full w-full flex flex-col font-semibold">
            <div class=" uppercase font-bold text-2xl">
                Chi tiết kiểu
            </div>
            <div class="w-[50vw] h-full flex justify-center items-start text-xl">
                <div class="w-full border h-fit flex flex-col">
                    <div class="flex-1 border flex flex-row">
                        <div class="border flex flex-[2] flex-col p-2 gap-2">
                            <div class="flex flex-row w-full items-center px-5">
                                <p>Tên kiểu:</p>
                                <p class="text-2xl flex-1 text-end">{{ typeData.name }} </p>
                            </div>
                            <div class="flex flex-row w-full items-center px-5">
                                <p class="flex-1">Trạng thái:</p>
                                <p v-if="typeData.status === 1" class="bg-green-500 text-white text-end px-2">
                                    Đang mở bán
                                </p>
                                <p v-else class="bg-red-500 text-white px-2 text-end">
                                    Đang đóng
                                </p>
                            </div>
                            <div class="flex flex-row w-full px-5">
                                <p>Danh sách các loại thức ăn:</p>
                                <div class="flex-1 flex flex-wrap gap-2 justify-end px-5">
                                    <span v-for="(cat, index) in filteredCategories" :key="index"
                                        class="text-xl bg-gray-200 px-2 py-1 rounded">
                                        {{ cat.name }}
                                    </span>
                                </div>
                            </div>

                            <!-- <div class="border p-2 h-96 flex flex-col gap-2 ">
                                <p>Danh sách các món ăn</p>
                                <div class="overflow-y-auto max-h-full">
                                    <div class="flex flex-row gap-2 justify-start items-center border">
                                        <img class="object-cover w-12 h-16" src="/picture/food/food 1.png" alt="">
                                        <p>Hamberger thịt nướng bơ tỏi hấp xả các thứ</p>
                                    </div>
                                    <div class="flex flex-row gap-2 justify-start items-center border">
                                        <img class="object-cover w-12 h-16" src="/picture/food/food 1.png" alt="">
                                        <p>Hamberger thịt nướng bơ tỏi hấp xả các thứ</p>
                                    </div>
                                    <div class="flex flex-row gap-2 justify-start items-center border">
                                        <img class="object-cover w-12 h-16" src="/picture/food/food 1.png" alt="">
                                        <p>Hamberger thịt nướng bơ tỏi hấp xả các thứ</p>
                                    </div>
                                    <div class="flex flex-row gap-2 justify-start items-center border">
                                        <img class="object-cover w-12 h-16" src="/picture/food/food 1.png" alt="">
                                        <p>Hamberger thịt nướng bơ tỏi hấp xả các thứ</p>
                                    </div>
                                    <div class="flex flex-row gap-2 justify-start items-center border">
                                        <img class="object-cover w-12 h-16" src="/picture/food/food 1.png" alt="">
                                        <p>Hamberger thịt nướng bơ tỏi hấp xả các thứ</p>
                                    </div>
                                    <div class="flex flex-row gap-2 justify-start items-center border">
                                        <img class="object-cover w-12 h-16" src="/picture/food/food 1.png" alt="">
                                        <p>Hamberger thịt nướng bơ tỏi hấp xả các thứ</p>
                                    </div>
                                </div>
                            </div> -->
                            <div class="flex flex-row gap-2 p-2">
                                <div class="bg-green-500 rounded-lg p-2 flex justify-center items-center flex-1 text-white hover:text-black hover:cursor-pointer hover:bg-green-300"
                                    @click="goEdit(typeData)">
                                    Chỉnh sửa
                                </div>
                                <div class="bg-red-500 rounded-lg p-2 flex justify-center items-center flex-1 text-white hover:text-black hover:cursor-pointer hover:bg-red-300"
                                    @click="goDelete">
                                    Xoá
                                </div>
                                <ConfirmDelete v-if="showConfirm" @confirm="confirmDelete" @cancel="cancelDelete" />

                                <div class=" rounded-lg border p-2 flex justify-center items-center flex-1 hover:cursor-pointer hover:bg-gray-300"
                                    @click="goBack">
                                    Trở lại
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>

import { useRoute, useRouter } from 'vue-router'
import { ref, onMounted, computed } from 'vue'
import ConfirmDelete from '../../../components/Admin/ConfirmDelete.vue';
import axios from 'axios'
const allItems = ref([])

const router = useRouter()
const route = useRoute()
const typeData = route.query.data ? JSON.parse(route.query.data) : null;
const showConfirm = ref(false)

onMounted(async () => {
    try {
        const response = await axios.get('http://127.0.0.1:8000/api/admin/categories')
        allItems.value = response.data
    } catch (error) {
        console.error('Lỗi khi tải dữ liệu:', error)
        alert('Không thể tải danh sách.')
    }
})

const filteredCategories = computed(() =>
    allItems.value.filter(item => item.id_type === typeData?.id)
)

function goBack() {
    router.push({ name: 'admin-types' })
}

function goDelete() {
    showConfirm.value = true
}

async function confirmDelete() {
    showConfirm.value = false

    try {
        await axios.delete(`http://127.0.0.1:8000/api/admin/types/${typeData.id}`)
        alert('Đã xoá rank thành công!')
        router.push({ name: 'admin-types' })
    } catch (error) {
        console.error('Lỗi khi xoá rank:', error)
        alert('Không thể xoá rank.')
    }
}

function cancelDelete() {
    showConfirm.value = false
}

function goEdit(item) {
    router.push({
        name: 'admin-edit-types',
        params: {
            id: item.id,
        },
        query: {
            data: JSON.stringify(item)
        }
    });
}
</script>