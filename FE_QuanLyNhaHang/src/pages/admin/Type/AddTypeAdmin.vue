<template>
    <div class="w-[calc(100vw-300px)] h-[calc(100vh-100px)] fixed z-0 mt-20 ms-[300px] flex flex-col p-4">
        <div class="h-full w-full flex flex-col font-semibold gap-4 overflow-y-auto">
            <!-- Tiêu đề -->
            <div class="uppercase font-bold text-3xl text-gray-800">Chỉnh sửa kiểu món ăn</div>

            <div class="max-w-5xl h-fit bg-white rounded-lg shadow-md p-6 border space-y-2">
                <div class="flex items-center gap-4">
                    <p class="w-32">Tên kiểu:</p>
                    <input type="text" id="name-category" class="flex-1 border rounded px-4 py-2 text-lg"
                        placeholder="Nhập tên kiểu..." />
                </div>

                <!-- Trạng thái -->
                <div class="flex items-center gap-4">
                    <label class="w-32">Trạng thái:</label>
                    <SwitchButton />
                </div>

                <!-- Nút thao tác -->
                <div class="flex justify-end gap-4 pt-4">
                    <button class="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-400">Lưu thay đổi</button>
                    <button @click="goBack" class="border px-6 py-2 rounded hover:bg-gray-100">Trở lại</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'
import SwitchButton from '../../../components/Admin/SwitchButton.vue';
import { ref } from 'vue'

const router = useRouter()
const route = useRoute()

function goBack() {
    router.push({ name: 'admin-types' })
}


</script>
