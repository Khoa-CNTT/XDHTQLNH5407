<template>
    <div class="w-[calc(100vw-300px)] h-[calc(100vh-100px)] fixed z-0 mt-20 ms-[300px] flex flex-col p-2">
        <div class="h-full w-full flex flex-col font-semibold">
            <div class=" uppercase font-bold text-2xl">
                Chi tiết món ăn
            </div>
            <div class="w-[70vw] h-full flex justify-center items-start text-xl">
                <div class="w-full border h-[70vh] flex flex-col">
                    <div class="flex-1 border flex flex-row">
                        <div class="flex flex-col flex-1 justify-center items-center">
                            <img class="w-full h-full object-cover" :src="`/picture/food/${foodData.picture}`"
                                alt="Ảnh món ăn" />
                        </div>
                        <div class="border flex flex-[2] flex-col p-2 gap-1">
                            <div class="flex flex-row items-center">
                                <p class="text-2xl">{{ foodData.name }}</p>
                                <div v-if="foodData.best_seller === 1" class="h-10 w-10">
                                    <img class="object-cover" src="/imageicon/best seller icon.png" alt="">
                                </div>
                            </div>
                            <div class="text-xl text-red-500 flex flex-row">
                                <p class="text-red-500">{{ foodData.cost.toLocaleString() }} VNĐ</p>
                            </div>
                            <div class="flex flex-row gap-2 items-center">
                                <p class="bg-red-500 text-white text-center border w-fit p-2 rounded-lg">
                                    {{ foodData.id_category }}</p>
                                <p class="bg-red-500 text-white text-center border w-fit p-2 rounded-lg">
                                    {{ foodData.id_type }}</p>
                            </div>
                            <p v-if="foodData.status === 1" class="bg-green-500 text-white rounded-md w-fit p-2">
                                Đang mở bán
                            </p>
                            <p v-else class="bg-red-500 text-white rounded-md w-fit p-2">
                                Đang đóng
                            </p>
                            <div class="flex flex-row">
                                <svg class="w-6 h-6 text-yellow-500" aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
                                    viewBox="0 0 24 24">
                                    <path
                                        d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
                                </svg>
                                <p class="text-red-500">5.0</p>
                                <p>/5.0</p>
                                <p class="ps-2">từ </p>
                                <p class="px-2 text-red-500">32</p>
                                <p class="">đánh giá</p>
                            </div>
                            <p class="font-normal">{{ foodData.detail }}</p>

                            <div class="flex flex-row gap-2 p-2">
                                <div class="bg-green-500 text-white rounded-lg p-2 flex justify-center items-center flex-1 hover:cursor-pointer hover:text-black hover:bg-green-300"
                                    @click="goEdit">
                                    Chỉnh sửa
                                </div>
                                <div
                                    class="bg-red-500 text-white rounded-lg p-2 flex justify-center items-center flex-1 hover:cursor-pointer hover:text-black hover:bg-red-300">
                                    Xoá
                                </div>
                                <div class=" rounded-lg border p-2 flex justify-center items-center flex-1 hover:cursor-pointer hover:bg-gray-300"
                                    @click="goBack">
                                    Trở lại
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="flex flex-col overflow-y-auto max-h-full">
                        <p class="uppercase font-bold">đánh giá</p>
                        <div class="flex flex-col w-full h-[50vh] gap-2 mt-2 ps-2">
                            <div class="flex flex-col">
                                <div class="flex flex-row">
                                    <p>Nguyễn Văn A</p>
                                    <p class="px-1 font-normal text-sm items-center flex">-</p>
                                    <p class="font-normal text-sm items-center flex">15/04/2025</p>
                                </div>
                                <p class="font-normal">Món này rất ngon, thịt mềm và thấm vị. Sẽ quay lại lần
                                    nữa! </p>
                            </div>
                            <div class="flex flex-col">
                                <div class="flex flex-row">
                                    <p>Nguyễn Văn A</p>
                                    <p class="px-1 font-normal text-sm items-center flex">-</p>
                                    <p class="font-normal text-sm items-center flex">15/04/2025</p>
                                </div>
                                <p class="font-normal">Món này rất ngon, thịt mềm và thấm vị. Sẽ quay lại lần
                                    nữa! </p>
                            </div>
                            <div class="flex flex-col">
                                <div class="flex flex-row">
                                    <p>Nguyễn Văn A</p>
                                    <p class="px-1 font-normal text-sm items-center flex">-</p>
                                    <p class="font-normal text-sm items-center flex">15/04/2025</p>
                                </div>
                                <p class="font-normal">Món này rất ngon, thịt mềm và thấm vị. Sẽ quay lại lần
                                    nữa! </p>
                            </div>
                            <div class="flex flex-col">
                                <div class="flex flex-row">
                                    <p>Nguyễn Văn A</p>
                                    <p class="px-1 font-normal text-sm items-center flex">-</p>
                                    <p class="font-normal text-sm items-center flex">15/04/2025</p>
                                </div>
                                <p class="font-normal">Món này rất ngon, thịt mềm và thấm vị. Sẽ quay lại lần
                                    nữa! </p>
                            </div>
                            <div class="flex flex-col">
                                <div class="flex flex-row">
                                    <p>Nguyễn Văn A</p>
                                    <p class="px-1 font-normal text-sm items-center flex">-</p>
                                    <p class="font-normal text-sm items-center flex">15/04/2025</p>
                                </div>
                                <p class="font-normal">Món này rất ngon, thịt mềm và thấm vị. Sẽ quay lại lần
                                    nữa! </p>
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

const router = useRouter()
const route = useRoute()

function goBack() {
    router.push({ name: 'admin-foods' })
}

function goEdit() {
    router.push({ name: 'admin-edit-foods' })
}

const foodId = route.params.id;
const foodData = route.query.data ? JSON.parse(route.query.data) : null;
</script>
