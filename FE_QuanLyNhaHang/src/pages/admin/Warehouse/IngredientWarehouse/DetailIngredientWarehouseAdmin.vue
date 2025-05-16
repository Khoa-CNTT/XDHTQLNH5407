<template>
    <div class="w-[calc(100vw-300px)] h-[calc(100vh-100px)] fixed z-0 mt-44 ms-[300px] flex flex-col p-2">
        <div class="h-full w-full flex flex-col font-semibold">
            <div class="w-[30vw] h-full flex justify-center items-start text-xl">
                <div class="w-full border h-fit flex flex-col">
                    <div class="flex-1 border flex flex-row">
                        <div class="border flex flex-[2] flex-col p-2 gap-2">
                            <div class="flex flex-row px-5 gap-2">
                                <p class="w-full">Hình ảnh:</p>
                                <div class="w-32 h-32 flex justify-center items-center overflow-hidden border">
                                    <img class=" w-full h-full object-cover" src="" alt="hình ảnh">
                                </div>
                            </div>
                            <div class="flex flex-row w-full items-center px-5">
                                <p>Tên thành phần:</p>
                                <p class="text-2xl flex-1 text-end">{{ ingredientWarehouseData.name_ingredient }}
                                </p>
                            </div>
                            <div class="flex flex-row w-full items-center px-5">
                                <p>Đơn vị tính:</p>
                                <p class="text-2xl flex-1 text-end">{{ ingredientWarehouseData.unit }}</p>
                            </div>
                            <div class="flex flex-row gap-2 p-2">
                                <div class="bg-green-500 rounded-lg p-2 flex justify-center items-center flex-1 text-white hover:text-black hover:cursor-pointer hover:bg-green-300"
                                    @click="goEdit(ingredientWarehouseData)">
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
import ConfirmDelete from '../../../../components/Admin/ConfirmDelete.vue';

const router = useRouter()
const route = useRoute()
const ingredientWarehouseData = route.query.data ? JSON.parse(route.query.data) : null;
const showConfirm = ref(false)

function goBack() {
    router.push({ name: 'ingredient-warehouse-admin' })
}

// function goDelete() {
//     showConfirm.value = true
// }

// function confirmDelete() {
//     showConfirm.value = false

//     console.log('Đã xác nhận xoá kiểu món ăn')
//     router.push({ name: 'menu-warehouse-admin' })
// }

// function cancelDelete() {
//     showConfirm.value = false
// }

// function goEdit(item) {
//     router.push({
//         name: 'admin-edit-types',
//         params: {
//             id: item.id,
//         },
//         query: {
//             data: JSON.stringify(item)
//         }
//     });
// }
</script>