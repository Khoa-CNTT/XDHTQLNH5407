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
                                <p>Danh sách các loại thức ăn:</p>
                                <p class="text-2xl flex-1 text-end">Lẫu, Nướng, Hấp</p>
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
                            <div class="border p-2 h-96 flex flex-col gap-2 ">
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
                            </div>
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
import { ref } from 'vue'
import ConfirmDelete from '../../../components/Admin/ConfirmDelete.vue';

const router = useRouter()
const route = useRoute()
const typeData = route.query.data ? JSON.parse(route.query.data) : null;
const showConfirm = ref(false)

function goBack() {
    router.push({ name: 'admin-types' })
}

function goDelete() {
    showConfirm.value = true
}

function confirmDelete() {
    showConfirm.value = false

    console.log('Đã xác nhận xoá kiểu món ăn')
    router.push({ name: 'admin-types' })
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